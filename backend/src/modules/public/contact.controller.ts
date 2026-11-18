import { Controller, Get, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

/** Data halaman kontak: pilihan layanan untuk form dan info kontak dari tabel settings. */
@Controller('public/contact')
export class PublicContactController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async get(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const [services, rows] = await Promise.all([
      this.db.all(
        'SELECT slug, name FROM services WHERE locale = ? AND is_published = true AND deleted_at IS NULL ORDER BY sort_order ASC, slug ASC',
        [locale],
      ),
      this.db.all("SELECT value FROM settings WHERE key = 'contact'"),
    ]);
    const contact = rows?.[0]?.value ?? {};
    return {
      data: {
        ...contact,
        serviceOptions: (services ?? []).map((s: any) => ({ value: s.slug, label: s.name })),
      },
      meta: { locale },
    };
  }
}