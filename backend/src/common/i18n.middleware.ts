import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // Hanya `?locale=` yang dihormati. Header Accept-Language browser tidak dipakai karena
    // seluruh isi database tersimpan pada locale `id`; pengunjung berbahasa Inggris dulu
    // menerima daftar kosong lalu jatuh ke data statis.
    const queryLocale = (req.query?.locale as string | undefined)?.toLowerCase();
    const locale = (queryLocale || 'id').slice(0, 2);
    (req as any).locale = locale === 'en' ? 'en' : 'id';
    next();
  }
}