import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from '@app/db-lib';
import { ALREADY_EXIST, NOT_FOUND } from '@app/common';

import { UserOutput } from './response/user.response';

import { UsersRepository } from './users.repository';
import { UserRegistrationInput } from '../auth/dto/user-registration.input';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(
    registrationInput: UserRegistrationInput,
  ): Promise<UserOutput> {
    const user = await this.usersRepository.getUserByParameter({
      email: registrationInput.email,
    });

    if (user) {
      throw new HttpException(ALREADY_EXIST('User'), HttpStatus.CONFLICT);
    }

    const { password: payload, ...rest } = registrationInput;

    const hashedPassword = await bcrypt.hash(payload, 10);

    const creationPayload = { ...rest, password: hashedPassword };

    const { id, email, login, role } = await this.usersRepository.create(
      creationPayload,
    );

    return { id, email, login, role };
  }

  public async getFullUserByParameter(filter: object): Promise<User> {
    const user = await this.usersRepository.getUserByParameter(filter);

    if (!user) {
      throw new NotFoundException(NOT_FOUND('User'));
    }

    return user;
  }

  public async updateRefreshToken(login: string, token: string): Promise<void> {
    await this.usersRepository.updateRefreshToken(login, token);
  }

  public async getRefreshTokenByLogin(login: string): Promise<string> {
    return await this.usersRepository.getRefreshTokenByLogin(login);
  }
}
