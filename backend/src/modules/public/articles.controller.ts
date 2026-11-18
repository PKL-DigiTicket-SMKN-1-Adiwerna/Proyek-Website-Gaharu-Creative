import { Controller, Get, Param, Req } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('public/articles')
export class PublicArticlesController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async list(@Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.all('SELECT * FROM articles WHERE locale = ? AND is_published = true AND deleted_at IS NULL ORDER BY published_at DESC', [locale]);
    return { data: data ?? [] };
  }
  @Get(':slug')
  async detail(@Param('slug') slug: string, @Req() req: any) {
    const locale = req.locale ?? 'id';
    const data = await this.db.get('SELECT * FROM articles WHERE locale = ? AND slug = ? AND is_published = true AND deleted_at IS NULL', [locale, slug]);
    return { data };
  }
}
