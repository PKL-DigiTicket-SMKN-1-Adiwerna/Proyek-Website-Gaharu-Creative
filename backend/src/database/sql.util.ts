import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { types } from 'pg';

/**
 * Samakan bentuk data Postgres dengan yang dulu dipakai SQLite:
 * - date/time/timestamp dikembalikan sebagai string, bukan objek Date
 * - count(*) (int8) dikembalikan sebagai number, bukan string
 */
export function configurePgTypes(): void {
  const asText = (v: string) => v;
  types.setTypeParser(1082, asText); // date
  types.setTypeParser(1083, asText); // time
  types.setTypeParser(1114, asText); // timestamp without tz
  types.setTypeParser(1184, (v: string) => new Date(v).toISOString()); // timestamptz
  types.setTypeParser(20, (v: string) => Number(v)); // int8
}

/** Ubah placeholder gaya SQLite `?` menjadi `$1..$n` dan datetime('now') menjadi now(). */
export function toPgParams(sql: string): string {
  let i = 0;
  let out = '';
  let inString = false;
  for (let p = 0; p < sql.length; p++) {
    const ch = sql[p];
    if (ch === "'") {
      // dua kutip tunggal berurutan = kutip yang di-escape, bukan penutup
      if (inString && sql[p + 1] === "'") { out += "''"; p++; continue; }
      inString = !inString;
      out += ch;
      continue;
    }
    out += ch === '?' && !inString ? `$${++i}` : ch;
  }
  return out.replace(/datetime\s*\(\s*'now'\s*\)/gi, 'now()');
}

/** Normalisasi baris: JSON string -> objek, kolom `is_*` 0/1 -> boolean. */
export function parseRow(row: any): any {
  if (!row || typeof row !== 'object') return row;
  const out: any = {};
  for (const k of Object.keys(row)) {
    let v = row[k];
    if (v instanceof Date) v = v.toISOString();
    if (typeof v === 'string') {
      const t = v.trim();
      if (t.startsWith('{') || t.startsWith('[')) {
        try { v = JSON.parse(t); } catch { /* biarkan string asli */ }
      }
    }
    if (/^is_/i.test(k)) {
      if (v === 0 || v === 1) v = v === 1;
      if (v === '0' || v === '1') v = v === '1';
    }
    out[k] = v;
  }
  return out;
}

/** Terjemahkan error Postgres yang lazim menjadi error HTTP Nest. */
export function toHttpError(err: any): Error {
  switch (err?.code) {
    case '22P02': // invalid text representation (mis. id bukan uuid)
      return new BadRequestException('Format data tidak valid');
    case 'PGRST116':
      return new NotFoundException('Data tidak ditemukan');
    case '23505': // unique violation
      return new ConflictException('Data sudah ada (duplikat)');
    case '23503': // foreign key violation
      return new BadRequestException('Referensi data tidak valid');
    case '23502': // not null violation
      return new BadRequestException(`Kolom wajib belum diisi: ${err?.column ?? 'tidak diketahui'}`);
    default:
      return err instanceof Error ? err : new Error(String(err));
  }
}