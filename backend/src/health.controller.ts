import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

/** Cek backend + koneksi Supabase hidup (dipakai setelah deploy). */
@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async check() {
    const dbUp = await this.db.ping();
    if (!dbUp) throw new ServiceUnavailableException('Basis data tidak terjangkau');
    return { status: 'ok', database: 'supabase', time: new Date().toISOString() };
  }
}
