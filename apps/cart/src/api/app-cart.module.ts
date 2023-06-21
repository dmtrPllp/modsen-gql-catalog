import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';

import { RedisCache } from 'apollo-server-cache-redis';

import { LoggerMiddleware, WinstonLoggerModule } from '@app/common';

import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      context: ({ req, res }: any) => ({ req, res }),
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      cache: new RedisCache({
        host: 'localhost',
        port: 6379,
      }),
    }),
    WinstonLoggerModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppCartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
