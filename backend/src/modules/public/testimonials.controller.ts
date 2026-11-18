import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/testimonials')
export class PublicTestimonialsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all('SELECT * FROM testimonials WHERE locale = ? AND is_published = true ORDER BY sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
}
