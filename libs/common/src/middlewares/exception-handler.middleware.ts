import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { ApolloError } from 'apollo-server-express';

import { WinstonLoggerService } from '../modules/logger/winston-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private loggerService: WinstonLoggerService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const request = host.getArgByIndex(2).req;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      this.loggerService.error(
        `${request.method || '{METHOD}'} ${
          request.url || '{URL}'
        } QUERY ${JSON.stringify(request.query)} BODY ${JSON.stringify(
          request.body,
        )}  ${exception}`,
      );

      throw new ApolloError(exception.message, `${status}`);
    } else {
      this.loggerService.error(`${exception}`);

      throw new ApolloError(exception.message, '500');
    }
  }
}
