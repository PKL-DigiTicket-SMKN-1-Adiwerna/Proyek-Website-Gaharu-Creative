import { PublicStatsController } from './stats.controller';

/** Memastikan endpoint statistik publik hanya mengambil baris yang tayang. */
describe('PublicStatsController', () => {
  it('menyaring is_published = true pada query stats', async () => {
    const dipanggil: { sql: string; params: any[] }[] = [];
    const db: any = {
      all: async (sql: string, params: any[]) => {
        dipanggil.push({ sql, params });
        return [{ value: '26', is_published: true }];
      },
    };
    const hasil = await new PublicStatsController(db).list({ locale: 'id' });
    expect(dipanggil[0].sql).toContain('is_published = true');
    expect(dipanggil[0].params).toEqual(['id']);
    expect(hasil.data).toHaveLength(1);
  });
});