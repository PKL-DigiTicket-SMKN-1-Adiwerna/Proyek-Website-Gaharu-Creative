import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DatabaseService } from '../../database/database.service';
import * as crypto from 'crypto';

@Controller('admin/stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminStatsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM stats WHERE locale = ? ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }

  @Post()
  async create(@Body() dto: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run('INSERT INTO stats (id, group_id, locale, label, value, suffix, icon, sort_order, is_published) VALUES (?,?,?,?,?,?,?,?,?)',
      [id, groupId, locale, dto.label, String(dto.value), dto.suffix ?? null, dto.icon ?? null, dto.sort_order ?? 0, dto.is_published ? 1 : 0]);
    const data = this.db.get('SELECT * FROM stats WHERE id = ?', [id]);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of ['value', 'suffix', 'label', 'sort_order']) {
      if (dto[k] !== undefined) { fields.push(`${k} = ?`); vals.push(dto[k]); }
    }
    if (dto.is_published !== undefined) { fields.push('is_published = ?'); vals.push(dto.is_published ? 1 : 0); }
    vals.push(id);
    this.db.run(`UPDATE stats SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM stats WHERE id = ?', [id]);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    this.db.run('DELETE FROM stats WHERE id = ?', [id]);
    return;
  }
}
