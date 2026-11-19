import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';

/**
 * Angka dasbor panel admin. Semua nilai dihitung langsung dari tabel, bukan angka
 * statis di frontend, supaya kartu dasbor ikut berubah begitu isi diubah.
 * Satu kueri untuk semua hitungan (satu perjalanan ke basis data).
 */
@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminDashboardController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async summary(@Req() req: any) {
    const locale = (req.query?.locale as string) ?? 'id';

    const counts = await this.db.get(
      `WITH svc AS (SELECT is_published FROM services WHERE locale = ? AND deleted_at IS NULL),
            prt AS (SELECT is_published FROM portfolio_items WHERE locale = ? AND deleted_at IS NULL),
            art AS (SELECT is_published FROM articles WHERE locale = ? AND deleted_at IS NULL),
            cli AS (SELECT is_published FROM clients WHERE locale = ?),
            stt AS (SELECT is_published FROM stats WHERE locale = ?),
            tm  AS (SELECT is_published FROM team_members WHERE locale = ?),
            aw  AS (SELECT is_published FROM awards WHERE locale = ? AND deleted_at IS NULL),
            inq AS (SELECT status FROM contact_inquiries)
       SELECT (SELECT count(*) FROM svc) AS services_total,
              (SELECT count(*) FROM svc WHERE is_published) AS services_published,
              (SELECT count(*) FROM prt) AS portfolio_total,
              (SELECT count(*) FROM prt WHERE is_published) AS portfolio_published,
              (SELECT count(*) FROM art) AS articles_total,
              (SELECT count(*) FROM art WHERE is_published) AS articles_published,
              (SELECT count(*) FROM cli) AS clients_total,
              (SELECT count(*) FROM cli WHERE is_published) AS clients_published,
              (SELECT count(*) FROM stt) AS stats_total,
              (SELECT count(*) FROM stt WHERE is_published) AS stats_published,
              (SELECT count(*) FROM tm) AS team_total,
              (SELECT count(*) FROM tm WHERE is_published) AS team_published,
              (SELECT count(*) FROM aw) AS awards_total,
              (SELECT count(*) FROM aw WHERE is_published) AS awards_published,
              (SELECT count(*) FROM inq) AS inquiries_total,
              (SELECT count(*) FROM inq WHERE status = 'new') AS inquiries_new`,
      [locale, locale, locale, locale, locale, locale, locale],
    );

    const recent = await this.db.all(
      'SELECT id, full_name, email, service_interest, status, created_at FROM contact_inquiries ORDER BY created_at DESC LIMIT 5',
    );

    return {
      data: { locale, ...(counts ?? {}), recent_inquiries: recent ?? [] },
      meta: { locale },
    };
  }
}