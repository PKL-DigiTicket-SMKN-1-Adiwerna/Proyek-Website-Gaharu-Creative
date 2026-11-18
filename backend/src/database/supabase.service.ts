import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Klien Supabase sisi server. Hanya memakai service role key yang tersimpan di
 * environment server, tidak pernah dikirim ke browser.
 * Dipakai untuk autentikasi admin (Supabase Auth) supaya password tidak
 * disimpan sendiri oleh backend.
 */
@Injectable()
export class SupabaseService {
  readonly admin: SupabaseClient;

  constructor(config: ConfigService) {
    const url = config.get<string>('SUPABASE_URL');
    const serviceRoleKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceRoleKey) {
      throw new Error('SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di backend/.env');
    }
    this.admin = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
}
