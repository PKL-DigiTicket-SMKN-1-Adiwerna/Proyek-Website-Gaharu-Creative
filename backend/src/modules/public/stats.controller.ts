import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/stats')
export class PublicStatsController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    // Tabel stats tidak punya kolom deleted_at, jadi cukup saring is_published.
    const data = await this.db.all('SELECT * FROM stats WHERE locale = ? AND is_published = true ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
}
