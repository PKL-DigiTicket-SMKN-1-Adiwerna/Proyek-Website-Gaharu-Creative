import { Controller, Get, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DatabaseService } from '../../database/database.service';

@Controller('admin/inquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'editor')
export class AdminInquiriesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list(@Req() req: any) {
    const status = req.query?.status as string | undefined;
    const rows = status
      ? this.db.all('SELECT * FROM contact_inquiries WHERE status = ? ORDER BY created_at DESC', [status])
      : this.db.all('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
    return { data: rows ?? [] };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { status?: string; internal_notes?: string; assigned_to?: string | null }) {
    const fields: string[] = [];
    const vals: any[] = [];
    if (body.status !== undefined) { fields.push('status = ?'); vals.push(body.status); }
    if (body.internal_notes !== undefined) { fields.push('internal_notes = ?'); vals.push(body.internal_notes); }
    if (body.assigned_to !== undefined) { fields.push('assigned_to = ?'); vals.push(body.assigned_to); }
    fields.push('updated_at = ?'); vals.push(new Date().toISOString());
    vals.push(id);
    this.db.run(`UPDATE contact_inquiries SET ${fields.join(', ')} WHERE id = ?`, vals);
    const data = this.db.get('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
    return { data };
  }
}