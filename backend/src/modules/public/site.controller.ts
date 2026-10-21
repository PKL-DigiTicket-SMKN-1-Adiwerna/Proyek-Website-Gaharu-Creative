import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/site')
export class PublicSiteController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async get(@Req() req: any) {
    const rows = this.db.all('SELECT key, value, is_public FROM settings WHERE is_public = 1');
    const out: Record<string, unknown> = {};
    (rows ?? []).forEach((r: any) => { out[r.key] = r.value; });
    return { data: out, locale: req.locale ?? 'id' };
  }
}