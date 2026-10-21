import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DatabaseService } from '../../database/database.service';
import * as crypto from 'crypto';

@Controller('admin/about')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminAboutController {
  constructor(private readonly db: DatabaseService) {}

  @Get('stories')
  async listStories(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM about_stories WHERE locale = ? ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
  @Post('stories')
  async createStory(@Body() dto: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run('INSERT INTO about_stories (id, group_id, locale, title, description, sort_order) VALUES (?,?,?,?,?,?)',
      [id, groupId, locale, dto.title, dto.body ?? null, dto.sort_order ?? 0]);
    const data = this.db.get('SELECT * FROM about_stories WHERE id = ?', [id]);
    return { data };
  }
  @Patch('stories/:id')
  async updateStory(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    if (dto.title !== undefined) { fields.push('title = ?'); vals.push(dto.title); }
    if (dto.body !== undefined) { fields.push('description = ?'); vals.push(dto.body); }
    if (dto.sort_order !== undefined) { fields.push('sort_order = ?'); vals.push(dto.sort_order); }
    vals.push(id);
    this.db.run(`UPDATE about_stories SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM about_stories WHERE id = ?', [id]);
    return { data };
  }
  @Delete('stories/:id')
  @HttpCode(204)
  async removeStory(@Param('id') id: string) {
    this.db.run('DELETE FROM about_stories WHERE id = ?', [id]);
    return;
  }

  @Get('values')
  async listValues(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM company_values WHERE locale = ? ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
  @Post('values')
  async createValue(@Body() dto: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run('INSERT INTO company_values (id, group_id, locale, title, description, icon, sort_order) VALUES (?,?,?,?,?,?,?)',
      [id, groupId, locale, dto.title, dto.description ?? null, dto.icon ?? null, dto.sort_order ?? 0]);
    const data = this.db.get('SELECT * FROM company_values WHERE id = ?', [id]);
    return { data };
  }
  @Patch('values/:id')
  async updateValue(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of ['title','description','icon','sort_order']) {
      if (dto[k] !== undefined) { fields.push(`${k} = ?`); vals.push(dto[k]); }
    }
    vals.push(id);
    this.db.run(`UPDATE company_values SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM company_values WHERE id = ?', [id]);
    return { data };
  }
  @Delete('values/:id')
  @HttpCode(204)
  async removeValue(@Param('id') id: string) {
    this.db.run('DELETE FROM company_values WHERE id = ?', [id]);
    return;
  }

  @Get('team')
  async listTeam(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const data = this.db.all('SELECT * FROM team_members WHERE locale = ? ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
  @Post('team')
  async createMember(@Body() dto: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? 'id';
    const id = crypto.randomUUID();
    const groupId = crypto.randomUUID();
    this.db.run('INSERT INTO team_members (id, group_id, locale, name, role, bio, photo_path, sort_order) VALUES (?,?,?,?,?,?,?,?)',
      [id, groupId, locale, dto.name, dto.role ?? null, dto.bio ?? null, dto.photo_path ?? null, dto.sort_order ?? 0]);
    const data = this.db.get('SELECT * FROM team_members WHERE id = ?', [id]);
    return { data };
  }
  @Patch('team/:id')
  async updateMember(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const fields: string[] = [];
    const vals: any[] = [];
    for (const k of ['name','role','bio','photo_path','sort_order']) {
      if (dto[k] !== undefined) { fields.push(`${k} = ?`); vals.push(dto[k]); }
    }
    vals.push(id);
    this.db.run(`UPDATE team_members SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM team_members WHERE id = ?', [id]);
    return { data };
  }
  @Delete('team/:id')
  @HttpCode(204)
  async removeMember(@Param('id') id: string) {
    this.db.run('DELETE FROM team_members WHERE id = ?', [id]);
    return;
  }

  @Get('mission')
  async getMission(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';
    const rows = this.db.all("SELECT * FROM mission_vision WHERE locale = ? AND kind IN ('misi','visi')", [locale]) ?? [];
    const misi = rows.find((r: any) => r.kind === 'misi');
    const visi = rows.find((r: any) => r.kind === 'visi');
    return { data: { mission: misi?.description ?? '', vision: visi?.description ?? '' } };
  }
  @Patch('mission')
  async updateMission(@Body() dto: any, @Req() req: any, @CurrentUser() user: any) {
    const locale = dto.locale ?? (req.query?.locale as string) ?? 'id';
    if (dto.mission !== undefined) {
      const existing = this.db.get("SELECT id FROM mission_vision WHERE locale = ? AND kind = 'misi'", [locale]);
      if (existing?.id) {
        this.db.run("UPDATE mission_vision SET description = ?, title = 'Misi' WHERE id = ?", [dto.mission, existing.id]);
      } else {
        const id = crypto.randomUUID();
        this.db.run("INSERT INTO mission_vision (id, group_id, locale, kind, title, description, sort_order) VALUES (?,?,?,?,?,?,?)",
          [id, crypto.randomUUID(), locale, 'misi', 'Misi', dto.mission, 0]);
      }
    }
    if (dto.vision !== undefined) {
      const existing = this.db.get("SELECT id FROM mission_vision WHERE locale = ? AND kind = 'visi'", [locale]);
      if (existing?.id) {
        this.db.run("UPDATE mission_vision SET description = ?, title = 'Visi' WHERE id = ?", [dto.vision, existing.id]);
      } else {
        const id = crypto.randomUUID();
        this.db.run("INSERT INTO mission_vision (id, group_id, locale, kind, title, description, sort_order) VALUES (?,?,?,?,?,?,?)",
          [id, crypto.randomUUID(), locale, 'visi', 'Visi', dto.vision, 0]);
      }
    }
    const rows = this.db.all("SELECT * FROM mission_vision WHERE locale = ? AND kind IN ('misi','visi')", [locale]) ?? [];
    const misi = rows.find((r: any) => r.kind === 'misi');
    const visi = rows.find((r: any) => r.kind === 'visi');
    return { data: { mission: misi?.description ?? '', vision: visi?.description ?? '' } };
  }
}
