import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AdminServicesController } from './admin-services.controller';
import { AdminPortfolioController } from './admin-portfolio.controller';
import { AdminArticlesController } from './admin-articles.controller';
import { AdminStatsController } from './admin-stats.controller';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminAboutController } from './admin-about.controller';
import { AdminClientsController } from './admin-clients.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AdminServicesController,
    AdminPortfolioController,
    AdminArticlesController,
    AdminStatsController,
    AdminSettingsController,
    AdminAboutController,
    AdminClientsController,
  ],
})
export class AdminModule {}
