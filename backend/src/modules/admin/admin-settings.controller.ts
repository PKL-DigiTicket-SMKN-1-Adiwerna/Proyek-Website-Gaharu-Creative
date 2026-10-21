import { Controller, Get, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DatabaseService } from '../../database/database.service';
import * as crypto from 'crypto';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin')
export class AdminSettingsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const data = this.db.all('SELECT * FROM settings');
    return { data: data ?? [] };
  }

  @Patch(':key')
  async upsert(@Param('key') key: string, @Body() dto: any, @Req() req: any, @CurrentUser() user: any) {
    const existing = this.db.get('SELECT id FROM settings WHERE key = ?', [key]);
    if (existing?.id) {
      this.db.run('UPDATE settings SET value = ?, is_public = 1, updated_by = ?, updated_at = ? WHERE id = ?',
        [JSON.stringify(dto.value), user?.id ?? null, new Date().toISOString(), existing.id]);
      const data = this.db.get('SELECT * FROM settings WHERE id = ?', [existing.id]);
      return { data };
    }
    const id = crypto.randomUUID();
    this.db.run('INSERT INTO settings (id, key, value, is_public, updated_by) VALUES (?,?,?,?,?)',
      [id, key, JSON.stringify(dto.value), 1, user?.id ?? null]);
    const data = this.db.get('SELECT * FROM settings WHERE id = ?', [id]);
    return { data };
  }
}
