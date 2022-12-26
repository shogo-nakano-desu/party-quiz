import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        process.env.ENV === 'production'
          ? true
          : join(process.cwd(), '../web/graphql/schema.gql'),
      sortSchema: true,
      debug: false,
      playground: false,
    }),
    CoreModule,
    UserAnswerModule,
  ],
})
export class ApiModule {}
