import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { IDataServices, User } from '@app/db-lib';

import { UserOutput } from './response/user.response';
import { UserRegistrationInput } from '../auth/dto/user-registration.input';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: IDataServices) {}

  public async getUserByParameter(filter: object): Promise<User> {
    const user = await this.db.users.findOneByParameters(filter);

    return user;
  }

  public async create(
    registrationInput: UserRegistrationInput,
  ): Promise<UserOutput> {
    return await this.db.users.create({ id: v4(), ...registrationInput });
  }

  public async updateRefreshToken(login: string, token: string): Promise<void> {
    await this.db.users.update(
      { login },
      {
        refreshToken: token,
      },
    );
  }

  public async getRefreshTokenByLogin(login: string): Promise<string> {
    const user = await this.db.users.findOneByParameters({ login });

    return user.refreshToken;
  }
}
