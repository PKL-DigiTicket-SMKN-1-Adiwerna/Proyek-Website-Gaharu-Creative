import { Controller, Get, Patch, Delete, Param, Body, Req, UseGuards, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';

/** Nilai sah untuk kolom `contact_inquiries.status` (enum inquiry_status di Supabase). */
const INQUIRY_STATUS = ['new', 'read', 'replied', 'in_progress', 'won', 'lost', 'spam'];

/** Batas jumlah baris yang dikirim endpoint daftar agar respons tetap ringan. */
const INQUIRY_PAGE_SIZE = 200;

@Controller('admin/inquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminInquiriesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const status = req.query?.status as string | undefined;
    const limit = Math.min(Number(req.query?.limit) || INQUIRY_PAGE_SIZE, INQUIRY_PAGE_SIZE);
    const rows = status
      ? await this.db.all(
          'SELECT * FROM contact_inquiries WHERE status = ? ORDER BY created_at DESC LIMIT ?',
          [status, limit],
        )
      : await this.db.all('SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT ?', [limit]);
    return { data: rows ?? [] };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { status?: string; internal_notes?: string; assigned_to?: string | null }) {
    const fields: string[] = [];
    const vals: any[] = [];
    if (body.status !== undefined) {
      if (!INQUIRY_STATUS.includes(body.status)) {
        throw new BadRequestException(`Status tidak dikenal: ${body.status}`);
      }
      fields.push('status = ?'); vals.push(body.status);
    }
    if (body.internal_notes !== undefined) { fields.push('internal_notes = ?'); vals.push(body.internal_notes); }
    if (body.assigned_to !== undefined) { fields.push('assigned_to = ?'); vals.push(body.assigned_to); }
    /* Tandai waktu balasan saat status diubah jadi `replied`, supaya riwayat balasan tercatat. */
    if (body.status === 'replied') { fields.push('admin_replied_at = ?'); vals.push(new Date().toISOString()); }
    fields.push('updated_at = ?'); vals.push(new Date().toISOString());
    vals.push(id);
    const hasil = await this.db.run(`UPDATE contact_inquiries SET ${fields.join(', ')} WHERE id = ?`, vals);
    if (!hasil.changes) {
      throw new NotFoundException(`Pesan masuk tidak ditemukan: ${id}`);
    }
    const data = await this.db.get('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const hasil = await this.db.run('DELETE FROM contact_inquiries WHERE id = ?', [id]);
    if (!hasil.changes) {
      throw new NotFoundException(`Pesan masuk tidak ditemukan: ${id}`);
    }
  }
}