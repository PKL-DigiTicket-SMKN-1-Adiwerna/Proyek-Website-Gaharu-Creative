import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedHandler: any;

async function getHandler() {
  if (!cachedHandler) {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.enableCors({
      origin: process.env.FRONTEND_ORIGIN || '*',
      credentials: true,
    });
    await app.init();
    cachedHandler = app.getHttpAdapter().getInstance();
  }
  return cachedHandler;
}

export default async function handler(req: any, res: any) {
  try {
    const h = await getHandler();
    return h(req, res);
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err?.message, stack: err?.stack }));
  }
}