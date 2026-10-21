import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PublicServicesController } from './services.controller';
import { PublicSiteController } from './site.controller';
import { PublicPortfolioController } from './portfolio.controller';
import { PublicArticlesController } from './articles.controller';
import { PublicStatsController } from './stats.controller';
import { PublicAboutController } from './about.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicServicesController, PublicSiteController, PublicPortfolioController, PublicArticlesController, PublicStatsController, PublicAboutController],
})
export class PublicModule {}
