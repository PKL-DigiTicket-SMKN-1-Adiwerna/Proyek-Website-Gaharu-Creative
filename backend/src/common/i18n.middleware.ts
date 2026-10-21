import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const queryLocale = (req.query?.locale as string | undefined)?.toLowerCase();
    const header = req.headers['accept-language']?.toString().toLowerCase() ?? '';
    const fromHeader = header.split(',')[0]?.split('-')[0]?.trim();
    const locale = (queryLocale || fromHeader || 'id').slice(0, 2);
    (req as any).locale = locale === 'en' ? 'en' : 'id';
    next();
  }
}