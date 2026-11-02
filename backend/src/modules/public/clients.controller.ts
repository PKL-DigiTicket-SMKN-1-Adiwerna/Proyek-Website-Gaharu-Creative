import { Controller, Get, Query, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

/* Daftar mitra/klien untuk dinding logo di section Rekam Jejak.
 * Urutan mengikuti sort_order (sama seperti daftar yang dikirim perusahaan),
 * supaya posisi logo tidak berubah-ubah tiap permintaan.
 */
@Controller('public/clients')
export class PublicClientsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any, @Query('category') category?: string) {
    const locale = req.locale ?? 'id';
    const where = ['locale = ?', 'is_published = 1'];
    const params: any[] = [locale];
    if (category) {
      where.push('category = ?');
      params.push(category);
    }
    const data = this.db.all(
      `SELECT * FROM clients WHERE ${where.join(' AND ')} ORDER BY sort_order ASC`,
      params,
    );
    return { data: data ?? [], meta: { total: (data ?? []).length } };
  }
}
