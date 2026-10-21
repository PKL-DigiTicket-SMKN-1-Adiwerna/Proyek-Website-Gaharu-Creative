import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { I18nMiddleware } from './i18n.middleware';

@Module({})
export class I18nModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}