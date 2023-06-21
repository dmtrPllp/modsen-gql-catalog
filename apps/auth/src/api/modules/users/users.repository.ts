import { Injectable } from '@nestjs/common';
import { IDataServices, User } from '@app/db-lib';
import { UserInput } from './dto/user-input.dto';
import { UserOutput } from './response/user.response';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: IDataServices) {}

  public async getUserByParameter(filter: object): Promise<User> {
    const user = await this.db.users.findOneByParameters(filter);

    return user;
  }

  public async create(createUserInput: UserInput): Promise<UserOutput> {
    return await this.db.users.create({ id: v4(), ...createUserInput });
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
