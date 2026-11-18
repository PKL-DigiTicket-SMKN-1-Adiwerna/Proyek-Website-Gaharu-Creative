import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/awards')
export class PublicAwardsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all(
      `SELECT id, slug, title, issuer, year, description, image_path, image_alt
       FROM awards
       WHERE locale = ? AND is_published = true AND deleted_at IS NULL
       ORDER BY sort_order ASC, year DESC NULLS LAST`,
      [locale],
    );
    return { data: data ?? [] };
  }
}
