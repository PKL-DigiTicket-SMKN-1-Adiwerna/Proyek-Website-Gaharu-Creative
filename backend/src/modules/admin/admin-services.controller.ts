import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DatabaseService } from '../../database/database.service';
import { CreateServiceDto } from './dto/create-service.dto';
import * as crypto from 'crypto';

@Controller('admin/services')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminServicesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM services WHERE locale = ? AND deleted_at IS NULL ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const data = this.db.get('SELECT * FROM services WHERE id = ?', [id]);
    return { data };
  }

  @Post()
  async create(@Body() dto: CreateServiceDto, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run(`INSERT INTO services (id, group_id, locale, slug, tag, name, short_desc, problem, solution, deliverables, icon, sort_order, is_featured, is_published, published_at, created_by, updated_by)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, groupId, locale, dto.slug, dto.tag, dto.name, dto.short_desc ?? null, dto.problem ?? null, dto.solution ?? null,
       JSON.stringify(dto.deliverables ?? []), dto.icon ?? null, dto.sort_order ?? 0, (dto.is_featured ?? true) ? 1 : 0, (dto.is_published ?? false) ? 1 : 0,
       dto.is_published ? new Date().toISOString() : null, user?.id ?? null, user?.id ?? null]);
    const data = this.db.get('SELECT * FROM services WHERE id = ?', [id]);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateServiceDto, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    const map: Record<string, any> = {
      slug: dto.slug, tag: dto.tag, name: dto.name, short_desc: dto.short_desc, problem: dto.problem,
      solution: dto.solution, icon: dto.icon, sort_order: dto.sort_order,
    };
    for (const [k, v] of Object.entries(map)) {
      if (v !== undefined) { fields.push(`${k} = ?`); vals.push(v); }
    }
    if (dto.deliverables !== undefined) { fields.push('deliverables = ?'); vals.push(JSON.stringify(dto.deliverables)); }
    if (dto.is_featured !== undefined) { fields.push('is_featured = ?'); vals.push(dto.is_featured ? 1 : 0); }
    if (dto.is_published !== undefined) { fields.push('is_published = ?'); vals.push(dto.is_published ? 1 : 0); }
    fields.push('updated_by = ?', 'updated_at = ?');
    vals.push(user?.id ?? null, new Date().toISOString());
    vals.push(id);
    this.db.run(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM services WHERE id = ?', [id]);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    this.db.run('UPDATE services SET deleted_at = ?, updated_by = ? WHERE id = ?', [new Date().toISOString(), user?.id ?? null, id]);
    return;
  }
}