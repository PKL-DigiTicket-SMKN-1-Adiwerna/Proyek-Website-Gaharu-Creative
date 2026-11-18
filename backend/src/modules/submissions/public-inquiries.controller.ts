import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import * as crypto from 'crypto';

@Controller('public/inquiries')
export class PublicInquiriesController {
  constructor(private readonly db: DatabaseService) {}

  @Post()
  async create(@Body() dto: CreateInquiryDto, @Req() req: any, @Headers('idempotency-key') idem?: string) {
    const locale = dto.locale ?? req.locale ?? 'id';
    const key = idem?.trim() || null;

    // Kirim ulang form dengan kunci sama = balas data yang sudah ada, jangan buat baris baru.
    // `reference_code` tidak dipakai sebagai kunci karena diisi otomatis oleh trigger DB.
    if (key) {
      const existing = await this.db.get('SELECT * FROM contact_inquiries WHERE idempotency_key = ?', [key]);
      if (existing) return { data: existing, idempotent: true };
    }

    const id = crypto.randomUUID();
    await this.db.run(`INSERT INTO contact_inquiries (id, idempotency_key, full_name, company, email, phone, service_interest, budget_range, message, locale, source_page, status)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, key, dto.full_name, dto.company ?? null, dto.email, dto.phone ?? null, dto.service_interest ?? null,
       dto.budget_range ?? null, dto.message, locale, dto.source_page ?? null, 'new']);
    const data = await this.db.get('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
    return { data };
  }
}