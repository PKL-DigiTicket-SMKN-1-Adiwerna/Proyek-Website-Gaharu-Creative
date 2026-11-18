import { Controller, Get, Param, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/portfolio')
export class PublicPortfolioController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all('SELECT p.*, c.slug AS category_slug, c.name AS category_name FROM portfolio_items p LEFT JOIN portfolio_categories c ON c.id = p.category_id WHERE p.locale = ? AND p.is_published = true AND p.deleted_at IS NULL ORDER BY p.sort_order ASC', [locale]);
    return { data: data ?? [] };
  }
  /* Harus dideklarasikan sebelum ':slug', kalau tidak "categories" dianggap slug. */
  @Get('categories')
  async categories(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all(
      'SELECT id, slug, name, description, icon, sort_order FROM portfolio_categories WHERE locale = ? AND is_published = true AND deleted_at IS NULL ORDER BY sort_order ASC',
      [locale]
    );
    return { data: data ?? [] };
  }
  @Get(':slug')
  async detail(@Param('slug') slug: string, @Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.get('SELECT p.*, c.slug AS category_slug, c.name AS category_name FROM portfolio_items p LEFT JOIN portfolio_categories c ON c.id = p.category_id WHERE p.locale = ? AND p.slug = ? AND p.is_published = true AND p.deleted_at IS NULL', [locale, slug]);
    return { data };
  }
}
