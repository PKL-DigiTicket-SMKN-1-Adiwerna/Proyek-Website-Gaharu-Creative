import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService, private readonly config: ConfigService) {}

  async login(email: string, password: string) {
    const profile = this.db.get('SELECT * FROM profiles WHERE email = ?', [email]);
    if (!profile) throw new UnauthorizedException('Email atau password salah');
    if (!profile.is_active) throw new UnauthorizedException('Akun tidak aktif');
    const ok = await bcrypt.compare(password, profile.password_hash);
    if (!ok) throw new UnauthorizedException('Email atau password salah');
    const secret = this.config.get<string>('JWT_SECRET')!;
    const payload = { sub: profile.id, email, role: profile.role };
    const access_token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const refresh_token = jwt.sign({ sub: profile.id, type: 'refresh' }, secret, { expiresIn: '7d' });
    this.db.run('UPDATE profiles SET last_login_at = ? WHERE id = ?', [new Date().toISOString(), profile.id]);
    return {
      access_token,
      refresh_token,
      expires_in: 3600,
      user: { id: profile.id, email, full_name: profile.full_name, role: profile.role },
    };
  }

  async refresh(refreshToken: string) {
    const secret = this.config.get<string>('JWT_SECRET')!;
    let payload: any;
    try { payload = jwt.verify(refreshToken, secret); } catch { throw new UnauthorizedException('Refresh token tidak valid'); }
    if (payload?.type !== 'refresh') throw new UnauthorizedException('Refresh token tidak valid');
    const profile = this.db.get('SELECT * FROM profiles WHERE id = ?', [payload.sub]);
    if (!profile || !profile.is_active) throw new UnauthorizedException('Akun tidak aktif');
    const access_token = jwt.sign({ sub: profile.id, email: profile.email, role: profile.role }, secret, { expiresIn: '1h' });
    const newRefresh = jwt.sign({ sub: profile.id, type: 'refresh' }, secret, { expiresIn: '7d' });
    return { access_token, refresh_token: newRefresh, expires_in: 3600 };
  }

  async logout(_accessToken: string) {
    return { ok: true };
  }
}