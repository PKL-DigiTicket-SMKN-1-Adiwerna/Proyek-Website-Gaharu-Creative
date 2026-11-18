import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/about')
export class PublicAboutController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async get(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const stories = await this.db.all('SELECT * FROM about_stories WHERE locale = ? ORDER BY sort_order ASC', [locale]) ?? [];
    const values = await this.db.all('SELECT * FROM company_values WHERE locale = ? ORDER BY sort_order ASC', [locale]) ?? [];
    const team = await this.db.all('SELECT * FROM team_members WHERE locale = ? ORDER BY sort_order ASC', [locale]) ?? [];
    const mrows = await this.db.all("SELECT * FROM mission_vision WHERE locale = ? AND kind IN ('misi','visi')", [locale]) ?? [];
    const misi = mrows.find((r: any) => r.kind === 'misi');
    const visi = mrows.find((r: any) => r.kind === 'visi');
    return { data: { stories, values, team, mission: { mission: misi?.description ?? '', vision: visi?.description ?? '' } } };
  }
}
