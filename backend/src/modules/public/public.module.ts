import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PublicServicesController } from './services.controller';
import { PublicSiteController } from './site.controller';
import { PublicPortfolioController } from './portfolio.controller';
import { PublicArticlesController } from './articles.controller';
import { PublicStatsController } from './stats.controller';
import { PublicAboutController } from './about.controller';
import { PublicClientsController } from './clients.controller';
import { PublicContactController } from './contact.controller';
import { PublicHomeController } from './home.controller';
import { PublicTestimonialsController } from './testimonials.controller';
import { PublicAwardsController } from './awards.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicServicesController, PublicSiteController, PublicPortfolioController, PublicArticlesController, PublicStatsController, PublicAboutController, PublicClientsController, PublicHomeController, PublicTestimonialsController, PublicAwardsController, PublicContactController],
})
export class PublicModule {}
