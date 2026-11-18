import { Controller, Get, Param, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/articles')
export class PublicArticlesController {
  constructor(private readonly db: DatabaseService) {}

  /* Harus dideklarasikan sebelum ':slug', kalau tidak "categories" dianggap slug.
   * Tabel article_categories tidak punya kolom deleted_at, jadi filter itu tidak dipakai. */
  @Get('categories')
  async categories(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all(
      'SELECT id, slug, name, description, icon, sort_order FROM article_categories WHERE locale = ? AND is_published = true ORDER BY sort_order ASC',
      [locale]
    );
    return { data: data ?? [] };
  }

  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all(
      `SELECT a.*, c.slug AS category_slug, c.name AS category_name
         FROM articles a LEFT JOIN article_categories c ON c.id = a.category_id
        WHERE a.locale = ? AND a.is_published = true AND a.deleted_at IS NULL
        ORDER BY a.published_at DESC`,
      [locale]
    );
    return { data: data ?? [] };
  }

  @Get(':slug')
  async detail(@Param('slug') slug: string, @Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.get(
      `SELECT a.*, c.slug AS category_slug, c.name AS category_name
         FROM articles a LEFT JOIN article_categories c ON c.id = a.category_id
        WHERE a.locale = ? AND a.slug = ? AND a.is_published = true AND a.deleted_at IS NULL`,
      [locale, slug]
    );
    return { data };
  }
}
