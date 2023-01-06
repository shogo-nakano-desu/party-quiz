import { Module } from '@nestjs/common';
import { GuestAnswerUsecase } from './usecase/guest-answer/guest-answer.usecase';
import {
  DATASOURCE_CLIENT,
  QUERY_SERVICE_CLIENT,
  QUESTION_QUERY_SERVICE,
  RESULT_SUMMARY_QUERY_SERVICE,
  SESSION_DETAIL_REPOSITORY,
  USER_ANSWER_REPOSITORY,
} from './constants';
import { GuestAnswerDatasource } from './infra/guest-answer/guest-answer.datasource';
import { DatasourceClient } from './infra/datasource.client';
import { SessionDetailUsecase } from './usecase/session-detail/session-detail.usecase';
import { SessionDetailDatasource } from './infra/session-detail/session-detail.datasource';
import { ResultSummaryQueryDatasource } from './infra/result-summary/result-summary-query.datasource';
import { QueryServiceClient } from './infra/query-service';
import { QuestionQueryDatasource } from './infra/question/question-query.datasource';

@Module({
  imports: [],
  providers: [
    GuestAnswerUsecase,
    SessionDetailUsecase,
    { provide: QUESTION_QUERY_SERVICE, useClass: QuestionQueryDatasource },
    {
      provide: RESULT_SUMMARY_QUERY_SERVICE,
      useClass: ResultSummaryQueryDatasource,
    },
    { provide: USER_ANSWER_REPOSITORY, useClass: GuestAnswerDatasource },
    { provide: SESSION_DETAIL_REPOSITORY, useClass: SessionDetailDatasource },
    { provide: DATASOURCE_CLIENT, useValue: DatasourceClient.getInstance() },
    {
      provide: QUERY_SERVICE_CLIENT,
      useValue: QueryServiceClient.getInstance(),
    },
  ],
  exports: [
    GuestAnswerUsecase,
    SessionDetailUsecase,
    {
      provide: QUESTION_QUERY_SERVICE,
      useClass: QuestionQueryDatasource,
    },
    {
      provide: RESULT_SUMMARY_QUERY_SERVICE,
      useClass: ResultSummaryQueryDatasource,
    },
  ],
})
export class CoreModule {}
