import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DatabaseService } from '../../database/database.service';
import * as crypto from 'crypto';

@Controller('admin/articles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminArticlesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM articles WHERE locale = ? AND deleted_at IS NULL ORDER BY created_at DESC', [locale]);
    return { data: data ?? [] };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const data = this.db.get('SELECT * FROM articles WHERE id = ?', [id]);
    return { data };
  }

  @Post()
  async create(@Body() dto: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run(`INSERT INTO articles (id, group_id, locale, category_id, slug, title, excerpt, body, cover_path, cover_alt, author_name, read_minutes, is_featured, is_published, published_at, updated_by)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, groupId, locale, dto.category_id ?? null, dto.slug, dto.title, dto.excerpt ?? null, dto.body ?? null,
       dto.cover_path ?? null, dto.cover_alt ?? null, dto.author_name ?? null, dto.read_minutes ?? null,
       dto.is_featured ? 1 : 0, dto.is_published ? 1 : 0,
       dto.is_published ? new Date().toISOString() : null, user?.id ?? null]);
    const data = this.db.get('SELECT * FROM articles WHERE id = ?', [id]);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of ['category_id', 'slug', 'title', 'excerpt', 'body', 'cover_path', 'cover_alt', 'author_name', 'read_minutes']) {
      if (dto[k] !== undefined) { fields.push(`${k} = ?`); vals.push(dto[k]); }
    }
    if (dto.is_featured !== undefined) { fields.push('is_featured = ?'); vals.push(dto.is_featured ? 1 : 0); }
    if (dto.is_published !== undefined) {
      fields.push('is_published = ?'); vals.push(dto.is_published ? 1 : 0);
      if (dto.is_published === true) { fields.push('published_at = ?'); vals.push(new Date().toISOString()); }
    }
    fields.push('updated_by = ?', 'updated_at = ?');
    vals.push(user?.id ?? null, new Date().toISOString(), id);
    this.db.run(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM articles WHERE id = ?', [id]);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    this.db.run('UPDATE articles SET deleted_at = ?, updated_by = ? WHERE id = ?', [new Date().toISOString(), user?.id ?? null, id]);
    return;
  }
}
