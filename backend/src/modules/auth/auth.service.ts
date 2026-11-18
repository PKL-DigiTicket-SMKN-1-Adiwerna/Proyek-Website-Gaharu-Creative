import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { SupabaseService } from '../../database/supabase.service';

/**
 * Autentikasi admin memakai Supabase Auth.
 * Password tidak disimpan di backend; tabel `profiles` hanya menyimpan peran
 * (superadmin/admin/editor/viewer) yang dihubungkan lewat id pengguna Supabase.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly supabase: SupabaseService,
  ) {}

  private async profileOf(userId: string) {
    const profile = await this.db.get('SELECT * FROM profiles WHERE id = ?', [userId]);
    if (!profile) throw new UnauthorizedException('Profil belum terdaftar. Hubungi superadmin.');
    if (!profile.is_active) throw new UnauthorizedException('Akun tidak aktif');
    return profile;
  }

  private payload(email: string, profile: any, session: any) {
    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in ?? 3600,
      user: {
        id: profile.id,
        email,
        full_name: profile.full_name,
        role: profile.role,
      },
    };
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.admin.auth.signInWithPassword({ email, password });
    if (error || !data?.session || !data.user) {
      throw new UnauthorizedException('Email atau password salah');
    }
    const profile = await this.profileOf(data.user.id);
    await this.db.run('UPDATE profiles SET last_login_at = ? WHERE id = ?', [
      new Date().toISOString(),
      profile.id,
    ]);
    return this.payload(data.user.email ?? email, profile, data.session);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token tidak valid');
    const { data, error } = await this.supabase.admin.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error || !data?.session || !data.user) {
      throw new UnauthorizedException('Refresh token tidak valid atau kedaluwarsa');
    }
    const profile = await this.profileOf(data.user.id);
    return this.payload(data.user.email ?? '', profile, data.session);
  }

  async logout(accessToken: string) {
    if (accessToken) {
      await this.supabase.admin.auth.admin.signOut(accessToken).catch(() => undefined);
    }
    return { ok: true };
  }
}
