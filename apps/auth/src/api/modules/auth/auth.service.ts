import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { INVALID_TOKEN, TokenPayload } from '@app/common';

import { UserOutput } from '../users/response/user.response';
import CookieWithRefreshToken from './interfaces/cookie-with-refresh-token.interface';
import { UsersService } from '../users/users.service';
import { UserLoginInput } from './dto/user-login.dto';
import { LoginResponse } from './response/user-login.response';
import { RefreshResponse } from './response/access-token.response';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from '../../constants/params';

import { UserInput } from '../users/dto/user-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public registration(createUserInput: UserInput): Promise<UserOutput> {
    return this.usersService.create(createUserInput);
  }

  public async login(loginInput: UserLoginInput): Promise<LoginResponse> {
    const user = await this.validateUser(loginInput);

    if (!user) {
      throw new UnauthorizedException(`Login or password are invalid`);
    }

    const loginPayload = this.getLoginPayload(user);

    return loginPayload;
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
  ): Promise<UserOutput> {
    const { login } = this.jwtService.verify<TokenPayload>(refreshToken, {
      secret: this.configService.get(JWT_REFRESH_TOKEN_SECRET),
    });

    const refreshTokenFromDb = await this.usersService.getRefreshTokenByLogin(
      login,
    );

    if (refreshToken !== refreshTokenFromDb) {
      throw new HttpException(INVALID_TOKEN, HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.getFullUserByParameter({ login });

    return user;
  }

  public async refresh(token: string): Promise<RefreshResponse> {
    const user = await this.getUserIfRefreshTokenMatches(token);

    const payload: TokenPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    const accessToken = this.getAccessJwtToken(payload);

    const { token: refreshToken } = await this.getCookieWithJwtRefreshToken(
      payload,
    );

    return { accessToken, refreshToken };
  }

  public async validateUser({
    login,
    password,
  }: UserLoginInput): Promise<null | UserOutput> {
    const user = await this.usersService.getFullUserByParameter({ login });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  public async getLoginPayload(user: UserOutput): Promise<LoginResponse> {
    const payload: TokenPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };

    const accessToken = this.getAccessJwtToken(payload);

    const { token: refreshToken } = await this.getCookieWithJwtRefreshToken(
      payload,
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  public getAccessJwtToken(payload: TokenPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(JWT_ACCESS_TOKEN_SECRET),
      expiresIn: `${this.configService.get(JWT_ACCESS_TOKEN_EXPIRATION_TIME)}s`,
    });

    return token;
  }

  public async getCookieWithJwtRefreshToken(
    payload: TokenPayload,
  ): Promise<CookieWithRefreshToken> {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${this.configService.get(
        JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      )}s`,
    });

    await this.usersService.updateRefreshToken(payload.login, token);

    return {
      token,
    };
  }
}
