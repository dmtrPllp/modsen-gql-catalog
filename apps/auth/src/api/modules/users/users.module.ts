import { Module } from '@nestjs/common';

import { DataServiceModule } from '@app/db-lib';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DataServiceModule],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
