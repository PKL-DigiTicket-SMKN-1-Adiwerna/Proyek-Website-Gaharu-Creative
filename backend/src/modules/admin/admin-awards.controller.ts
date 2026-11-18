import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';
import { CreateAwardDto, UpdateAwardDto } from './dto/award.dto';
import * as crypto from 'crypto';

/** Kolom yang boleh diubah lewat PATCH; slug dibuat dari judul saat POST. */
const FIELDS = ['title', 'issuer', 'year', 'description', 'image_path', 'image_alt', 'sort_order'];

function slugify(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Controller('admin/awards')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminAwardsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = await this.db.all(
      'SELECT * FROM awards WHERE locale = ? AND deleted_at IS NULL ORDER BY sort_order ASC, year DESC NULLS LAST, title ASC',
      [locale],
    );
    return { data: data ?? [], meta: { total: (data ?? []).length } };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const data = await this.db.get('SELECT * FROM awards WHERE id = ? AND deleted_at IS NULL', [id]);
    if (!data) throw new NotFoundException('Penghargaan tidak ditemukan');
    return { data };
  }

  @Post()
  async create(@Body() dto: CreateAwardDto) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const slug = await this.uniqueSlug(locale, dto.slug || dto.title);
    await this.db.run(
      `INSERT INTO awards (id, group_id, locale, slug, title, issuer, year, description, image_path, image_alt, sort_order, is_published)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, crypto.randomUUID(), locale, slug, dto.title, dto.issuer ?? null, dto.year ?? null,
       dto.description ?? null, dto.image_path ?? null, dto.image_alt ?? null,
       dto.sort_order ?? 0, dto.is_published === false ? false : true],
    );
    return { data: await this.db.get('SELECT * FROM awards WHERE id = ?', [id]) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAwardDto) {
    const ada = await this.db.get('SELECT id FROM awards WHERE id = ? AND deleted_at IS NULL', [id]);
    if (!ada) throw new NotFoundException('Penghargaan tidak ditemukan');
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of FIELDS) {
      const v = (dto as any)[k];
      if (v !== undefined) { fields.push(`${k} = ?`); vals.push(v); }
    }
    if (dto.is_published !== undefined) { fields.push('is_published = ?'); vals.push(dto.is_published ? true : false); }
    if (fields.length) {
      vals.push(id);
      await this.db.run(`UPDATE awards SET ${fields.join(', ')} WHERE id = ?`, vals);
    }
    return { data: await this.db.get('SELECT * FROM awards WHERE id = ?', [id]) };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const ada = await this.db.get('SELECT id FROM awards WHERE id = ? AND deleted_at IS NULL', [id]);
    if (!ada) throw new NotFoundException('Penghargaan tidak ditemukan');
    await this.db.run('UPDATE awards SET deleted_at = ? WHERE id = ?', [new Date().toISOString(), id]);
    return;
  }

  /** Slug unik per locale untuk baris hidup; tambah -2, -3, ... bila sudah dipakai. */
  private async uniqueSlug(locale: string, source: string): Promise<string> {
    const base = slugify(source) || 'penghargaan';
    let slug = base;
    for (let i = 2; i <= 9; i++) {
      const dipakai = await this.db.get(
        'SELECT 1 AS ada FROM awards WHERE locale = ? AND slug = ? AND deleted_at IS NULL',
        [locale, slug],
      );
      if (!dipakai) return slug;
      slug = `${base}-${i}`;
    }
    return `${base}-${crypto.randomUUID().slice(0, 6)}`;
  }
}