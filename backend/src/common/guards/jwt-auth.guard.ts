import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { SupabaseService } from '../../database/supabase.service';

/**
 * Verifikasi token akses Supabase Auth, lalu tempelkan profil lokal
 * (tabel `profiles`) ke request supaya RolesGuard dan controller bisa memakai
 * `req.user.profile.role`.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly db: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header: string = req.headers?.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) throw new UnauthorizedException('Token tidak ditemukan');

    const { data, error } = await this.supabase.admin.auth.getUser(token);
    if (error || !data?.user) throw new UnauthorizedException('Token tidak valid atau kedaluwarsa');

    const profile = await this.db.get('SELECT * FROM profiles WHERE id = ?', [data.user.id]);
    if (!profile) throw new UnauthorizedException('Profil belum terdaftar');
    if (!profile.is_active) throw new UnauthorizedException('Akun tidak aktif');

    req.user = {
      id: profile.id,
      email: data.user.email,
      role: profile.role,
      profile,
      accessToken: token,
    };
    return true;
  }
}
