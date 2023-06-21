import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';

import { WinstonLoggerModule } from '@app/common';

import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      context: ({ req, res }: any) => ({ req, res }),
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: './',
      },
      typePaths: ['./**/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './apps/order/src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    WinstonLoggerModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppOrderModule {}
