import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { toHttpError, toPgParams, parseRow } from './sql.util';

describe('toPgParams', () => {
  it('mengubah ? menjadi $1..$n sesuai urutan', () => {
    expect(toPgParams('SELECT * FROM services WHERE locale = ? AND is_published = ? ORDER BY sort_order ASC'))
      .toBe('SELECT * FROM services WHERE locale = $1 AND is_published = $2 ORDER BY sort_order ASC');
  });

  it('menerjemahkan datetime(now) gaya SQLite ke now() Postgres', () => {
    expect(toPgParams("UPDATE clients SET updated_at = datetime('now') WHERE id = ?"))
      .toBe('UPDATE clients SET updated_at = now() WHERE id = $1');
  });

  it('tidak mengubah tanda tanya di dalam string literal', () => {
    expect(toPgParams("SELECT 'apa?' AS tanya WHERE id = ?")).toBe("SELECT 'apa?' AS tanya WHERE id = $1");
  });

  it('memperlakukan kutip tunggal berpasangan sebagai kutip yang di-escape', () => {
    expect(toPgParams("SELECT 'it''s ok?' AS t WHERE id = ?")).toBe("SELECT 'it''s ok?' AS t WHERE id = $1");
  });
});

describe('parseRow', () => {
  it('date/timestamp dikembalikan sebagai string ISO, bukan objek Date', () => {
    const row = parseRow({ created_at: new Date('2026-11-18T05:00:00Z') });
    expect(typeof row.created_at).toBe('string');
    expect(row.created_at).toBe('2026-11-18T05:00:00.000Z');
  });

  it('kolom is_* dikembalikan sebagai boolean', () => {
    expect(parseRow({ is_published: 1, is_public: '0', is_featured: false })).toEqual({
      is_published: true, is_public: false, is_featured: false,
    });
  });

  it('teks JSON (jsonb yang dibaca sebagai string) diubah menjadi objek', () => {
    const row = parseRow({ value: '{"name":"Gaharu Creative"}', tags: '["a","b"]' });
    expect(row.value).toEqual({ name: 'Gaharu Creative' });
    expect(row.tags).toEqual(['a', 'b']);
  });

  it('nilai non-objek dilewatkan apa adanya', () => {
    expect(parseRow(null)).toBeNull();
    expect(parseRow('teks')).toBe('teks');
  });
});

describe('toHttpError', () => {
  it('memetakan kode error Postgres ke error HTTP Nest yang sesuai', () => {
    expect(toHttpError({ code: '23505' })).toBeInstanceOf(ConflictException);
    expect(toHttpError({ code: '23503' })).toBeInstanceOf(BadRequestException);
    expect(toHttpError({ code: '23502', column: 'description' })).toBeInstanceOf(BadRequestException);
    expect(toHttpError({ code: '22P02' })).toBeInstanceOf(BadRequestException);
    expect(toHttpError({ code: 'PGRST116' })).toBeInstanceOf(NotFoundException);
  });

  it('menyebut nama kolom pada pelanggaran not null dan meneruskan error lain apa adanya', () => {
    expect(toHttpError({ code: '23502', column: 'description' }).message).toContain('description');
    const asli = new Error('koneksi putus');
    expect(toHttpError(asli)).toBe(asli);
  });
});
