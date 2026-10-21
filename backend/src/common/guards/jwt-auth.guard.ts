import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly db: DatabaseService, private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers?.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Token tidak ada');
    const token = auth.slice(7);
    const secret = this.config.get<string>('JWT_SECRET')!;
    let payload: any;
    try { payload = jwt.verify(token, secret); } catch { throw new UnauthorizedException('Token tidak valid'); }
    if (!payload?.sub) throw new UnauthorizedException('Token tidak valid');
    const profile = this.db.get('SELECT * FROM profiles WHERE id = ?', [payload.sub]);
    if (!profile) throw new UnauthorizedException('Token tidak valid');
    if (!profile.is_active) throw new UnauthorizedException('Akun tidak aktif');
    req.user = { id: profile.id, email: profile.email, role: profile.role, profile, accessToken: token };
    return true;
  }
}