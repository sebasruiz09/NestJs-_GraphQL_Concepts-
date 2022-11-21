import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
//* use Apollo web Client
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    //! initial config for graphQl + nest
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],

      //* define autoscheme
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
