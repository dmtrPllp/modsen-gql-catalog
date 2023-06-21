import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticationError } from 'apollo-server-core';

import { TokenPayload } from '@app/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.getArgByIndex(2).req;

    return request;
  }

  handleRequest(error: Error, user: TokenPayload): any {
    if (error || !user) {
      throw (
        error || new AuthenticationError('Could not authenticate with token')
      );
    }

    return user;
  }
}
