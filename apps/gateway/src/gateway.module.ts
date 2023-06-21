import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

import { handleAuth } from './context/auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: handleAuth,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users',
              url: 'http://localhost:3000/graphql',
            },
            {
              name: 'catalog',
              url: 'http://localhost:3003/graphql',
            },
            {
              name: 'cart',
              url: 'http://localhost:3004/graphql',
            },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('authorization', context.authorization);
            },
          });
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
