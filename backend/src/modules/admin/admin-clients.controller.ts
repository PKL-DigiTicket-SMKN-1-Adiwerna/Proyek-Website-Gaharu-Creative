import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';
import * as crypto from 'crypto';

const CATEGORIES = ['pemerintah', 'swasta'];

/* Slug dipakai sebagai nama berkas logo di public/logos/klien. Kalau admin tidak
 * mengisi slug, dibuat dari nama: huruf kecil, bukan huruf/angka diganti tanda hubung.
 */
function slugify(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Controller('admin/clients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminClientsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM clients WHERE locale = ? ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [], meta: { total: (data ?? []).length } };
  }

  @Post()
  async create(@Body() dto: any) {
    const category = CATEGORIES.includes(dto.category) ? dto.category : 'pemerintah';
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);
    const id = crypto.randomUUID();
    this.db.run(
      'INSERT INTO clients (id,group_id,locale,name,slug,category,logo_path,logo_alt,sort_order,is_published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,datetime(\'now\'),datetime(\'now\'))',
      [
        id,
        crypto.randomUUID(),
        dto.locale ?? 'id',
        dto.name,
        slug,
        category,
        dto.logo_path ?? `/logos/klien/${slug}.svg`,
        dto.logo_alt ?? dto.name,
        dto.sort_order ?? 999,
        dto.is_published === false ? 0 : 1,
      ],
    );
    return { data: this.db.get('SELECT * FROM clients WHERE id = ?', [id]) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of ['name', 'category', 'logo_path', 'logo_alt', 'sort_order']) {
      if (dto[k] !== undefined) {
        if (k === 'category' && !CATEGORIES.includes(dto[k])) continue;
        fields.push(`${k} = ?`);
        vals.push(dto[k]);
      }
    }
    if (dto.slug !== undefined) {
      const slug = slugify(dto.slug);
      if (slug) {
        fields.push('slug = ?');
        vals.push(slug);
      }
    }
    if (dto.is_published !== undefined) {
      fields.push('is_published = ?');
      vals.push(dto.is_published ? 1 : 0);
    }
    if (fields.length) {
      vals.push(id);
      this.db.run(`UPDATE clients SET ${fields.join(', ')}, updated_at = datetime('now') WHERE id = ?`, vals);
    }
    return { data: this.db.get('SELECT * FROM clients WHERE id = ?', [id]) };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    this.db.run('DELETE FROM clients WHERE id = ?', [id]);
    return;
  }
}
