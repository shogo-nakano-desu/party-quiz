import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GuestAnswerModule } from './guest-answer/guest-answer.module';
import { CoreModule } from '../core/core.module';
import { SessionDetailModule } from './session-detail/session-detail.module';
import { ResultSummaryModule } from './result-summary/result-summary.module';
import { QuestionModule } from './question/question.module';
import { SampleModule } from './sample/sample.module';

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
    GuestAnswerModule,
    SessionDetailModule,
    ResultSummaryModule,
    QuestionModule,
    SampleModule,
  ],
})
export class ApiModule {}
