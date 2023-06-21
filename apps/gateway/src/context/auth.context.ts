import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';

import {
  INVALID_AUTH_TOKEN,
  INVALID_BEARER_TOKEN,
} from '../constants/constants';

const getToken = (authToken: string): string => {
  const match = authToken.match(/^Bearer (.*)$/);

  if (!match || match.length < 2) {
    throw new HttpException(
      { message: INVALID_BEARER_TOKEN },
      HttpStatus.UNAUTHORIZED,
    );
  }

  return match[1];
};

const decodeToken = (tokenString: string) => {
  const decoded = verify(tokenString, process.env.JWT_ACCESS_TOKEN_SECRET);

  if (!decoded) {
    throw new HttpException(
      { message: INVALID_AUTH_TOKEN },
      HttpStatus.UNAUTHORIZED,
    );
  }

  return decoded;
};

export const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = getToken(req.headers.authorization);

      const decoded: any = decodeToken(token);

      return {
        user: { login: decoded.login, role: decoded.role },
        authorization: token,
      };
    }
  } catch (err) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};
