import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, SupabaseService],
  exports: [DatabaseService, SupabaseService],
})
export class DatabaseModule {}
