import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Response, NextFunction } from 'express';

import { WinstonLoggerService } from '../modules/logger/winston-logger.service';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { getRequestInformation } from '../constants/logger-info';
import { APP_ENVIRONMENT } from '../modules/logger/constants/params';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private loggerService: WinstonLoggerService,
    private configService: ConfigService,
  ) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    this.loggerService.log(
      getRequestInformation(
        String(this.configService.get(APP_ENVIRONMENT)),
        req,
      ),
    );

    next();
  }
}
