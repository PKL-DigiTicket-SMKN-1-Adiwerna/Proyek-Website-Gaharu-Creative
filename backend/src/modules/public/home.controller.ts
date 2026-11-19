import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

/** Ringkasan beranda: satu permintaan untuk layanan, angka statistik, dan karya pilihan. */
@Controller('public/home')
export class PublicHomeController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async get(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const [services, stats, featuredPortfolio] = await Promise.all([
      this.db.all('SELECT * FROM services WHERE locale = ? AND is_published = true AND deleted_at IS NULL ORDER BY sort_order ASC', [locale]),
      this.db.all('SELECT * FROM stats WHERE locale = ? AND is_published = true ORDER BY sort_order ASC', [locale]),
      this.db.all('SELECT * FROM portfolio_items WHERE locale = ? AND is_published = true AND deleted_at IS NULL ORDER BY sort_order ASC LIMIT 3', [locale]),
    ]);
    return {
      data: {
        services: { items: services ?? [] },
        stats: { items: stats ?? [] },
        featuredPortfolio: { items: featuredPortfolio ?? [] },
      },
      meta: { locale },
    };
  }
}
