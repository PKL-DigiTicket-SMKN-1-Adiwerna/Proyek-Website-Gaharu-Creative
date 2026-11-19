import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode, NotFoundException, ConflictException } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import * as crypto from 'crypto';

/** Kolom yang boleh diubah lewat PATCH. */
const FIELDS = ['name', 'slug', 'description', 'icon', 'sort_order'];

function slugify(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Controller('admin/portfolio-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminPortfolioCategoriesController {
  constructor(private readonly db: DatabaseService) {}

  /** Semua baris (termasuk draf) untuk locale aktif, urut sort_order. */
  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = await this.db.all(
      'SELECT * FROM portfolio_categories WHERE locale = ? AND deleted_at IS NULL ORDER BY sort_order ASC, name ASC',
      [locale],
    );
    return { data: data ?? [], meta: { total: (data ?? []).length } };
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const slug = await this.uniqueSlug(locale, dto.slug || dto.name);
    const urut = await this.db.get(
      'SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM portfolio_categories WHERE locale = ?',
      [locale],
    );
    await this.db.run(
      `INSERT INTO portfolio_categories (id, group_id, locale, slug, name, description, icon, sort_order, is_published)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [id, crypto.randomUUID(), locale, slug, dto.name, dto.description ?? null, dto.icon ?? null,
       dto.sort_order ?? urut?.next ?? 1, dto.is_published === false ? false : true],
    );
    return { data: await this.db.get('SELECT * FROM portfolio_categories WHERE id = ?', [id]) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const ada = await this.db.get('SELECT * FROM portfolio_categories WHERE id = ? AND deleted_at IS NULL', [id]);
    if (!ada) throw new NotFoundException('Kategori portofolio tidak ditemukan');
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of FIELDS) {
      const v = (dto as any)[k];
      if (v === undefined) continue;
      // slug dinormalkan dan dibuat unik lagi supaya PATCH tidak gagal karena indeks unik (slug, locale)
      fields.push(`${k} = ?`);
      vals.push(k === 'slug' ? await this.uniqueSlug(ada.locale, v, id) : v);
    }
    if (dto.is_published !== undefined) { fields.push('is_published = ?'); vals.push(dto.is_published ? true : false); }
    if (fields.length) {
      vals.push(id);
      await this.db.run(`UPDATE portfolio_categories SET ${fields.join(', ')} WHERE id = ?`, vals);
    }
    return { data: await this.db.get('SELECT * FROM portfolio_categories WHERE id = ?', [id]) };
  }

  /** Ditandai terhapus (deleted_at) hanya bila tidak ada portfolio_items yang memakainya. */
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const ada = await this.db.get('SELECT id FROM portfolio_categories WHERE id = ? AND deleted_at IS NULL', [id]);
    if (!ada) throw new NotFoundException('Kategori portofolio tidak ditemukan');
    const dipakai = await this.db.get(
      'SELECT COUNT(*) AS jumlah FROM portfolio_items WHERE category_id = ? AND deleted_at IS NULL',
      [id],
    );
    const jumlah = Number(dipakai?.jumlah ?? 0);
    if (jumlah > 0) {
      throw new ConflictException(
        `Kategori tidak bisa dihapus karena masih dipakai ${jumlah} portofolio. Pindahkan portofolio itu ke kategori lain dulu.`,
      );
    }
    await this.db.run('UPDATE portfolio_categories SET deleted_at = ? WHERE id = ?', [new Date().toISOString(), id]);
    return;
  }

  /**
   * Slug unik per locale; tambah -2, -3, ... bila sudah dipakai.
   * Filter deleted_at sengaja tidak dipakai karena indeks unik (slug, locale) mengikat baris terhapus juga.
   */
  private async uniqueSlug(locale: string, source: string, kecualiId?: string): Promise<string> {
    const base = slugify(source) || 'kategori';
    let slug = base;
    for (let i = 2; i <= 9; i++) {
      let sql = 'SELECT 1 AS ada FROM portfolio_categories WHERE locale = ? AND slug = ?';
      const params: any[] = [locale, slug];
      if (kecualiId) { sql += ' AND id <> ?'; params.push(kecualiId); }
      const dipakai = await this.db.get(sql, params);
      if (!dipakai) return slug;
      slug = `${base}-${i}`;
    }
    return `${base}-${crypto.randomUUID().slice(0, 6)}`;
  }
}
