import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PublicServicesController } from './services.controller';
import { PublicSiteController } from './site.controller';
import { PublicPortfolioController } from './portfolio.controller';
import { PublicArticlesController } from './articles.controller';
import { PublicStatsController } from './stats.controller';
import { PublicAboutController } from './about.controller';
import { PublicClientsController } from './clients.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicServicesController, PublicSiteController, PublicPortfolioController, PublicArticlesController, PublicStatsController, PublicAboutController, PublicClientsController],
})
export class PublicModule {}
