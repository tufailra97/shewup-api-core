import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode >= 500) {
        return this.logger.error(`{${originalUrl}} ${statusCode}`, method);
      }

      if (statusCode >= 400) {
        return this.logger.warn(`{${originalUrl}} ${statusCode}`, method);
      }

      this.logger.log(`{${originalUrl}} ${statusCode}`, method);
    });

    next();
  }
}
