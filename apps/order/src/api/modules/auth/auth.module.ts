import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { JwtStrategy } from '@app/common';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
