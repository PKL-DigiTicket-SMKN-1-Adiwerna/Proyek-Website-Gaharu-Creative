import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PublicInquiriesController } from './public-inquiries.controller';
import { AdminInquiriesController } from './admin-inquiries.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicInquiriesController, AdminInquiriesController],
})
export class SubmissionsModule {}