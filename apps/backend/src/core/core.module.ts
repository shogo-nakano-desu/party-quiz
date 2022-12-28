import { Module } from '@nestjs/common';
import { UserAnswerUsecase } from './usecase/user-answer/user-answer.usecase';
import {
  DATASOURCE_CLIENT,
  QUERY_SERVICE_CLIENT,
  RESULT_SUMMARY_QUERY_SERVICE,
  SESSION_DETAIL_REPOSITORY,
  USER_ANSWER_REPOSITORY,
} from './constants';
import { UserAnswerDatasource } from './infra/user-answer/user-answer.datasource';
import { DatasourceClient } from './infra/datasource.client';
import { SessionDetailUsecase } from './usecase/session-detail/session-detail.usecase';
import { SessionDetailDatasource } from './infra/session-detail/session-detail.datasource';
import { ResultSummaryQueryDatasource } from './infra/result-summary/result-summary-query.datasource';
import { QueryServiceClient } from './infra/query-service';

@Module({
  imports: [],
  providers: [
    UserAnswerUsecase,
    SessionDetailUsecase,
    {
      provide: RESULT_SUMMARY_QUERY_SERVICE,
      useClass: ResultSummaryQueryDatasource,
    },
    { provide: USER_ANSWER_REPOSITORY, useClass: UserAnswerDatasource },
    { provide: SESSION_DETAIL_REPOSITORY, useClass: SessionDetailDatasource },
    { provide: DATASOURCE_CLIENT, useValue: DatasourceClient.getInstance() },
    {
      provide: QUERY_SERVICE_CLIENT,
      useValue: QueryServiceClient.getInstance(),
    },
  ],
  exports: [
    UserAnswerUsecase,
    SessionDetailUsecase,
    {
      provide: RESULT_SUMMARY_QUERY_SERVICE,
      useClass: ResultSummaryQueryDatasource,
    },
  ],
})
export class CoreModule {}
