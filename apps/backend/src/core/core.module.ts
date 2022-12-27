import { Module } from '@nestjs/common';
import { UserAnswerUsecase } from './usecase/user-answer/user-answer.usecase';
import {
  DATASOURCE_CLIENT,
  SESSION_DETAIL_REPOSITORY,
  USER_ANSWER_REPOSITORY,
} from './constants';
import { UserAnswerDatasource } from './infra/user-answer/user-answer.datasource';
import { DatasourceClient } from './infra/datasource.client';
import { SessionDetailUsecase } from './usecase/session-detail/session-detail.usecase';
import { SessionDetailDatasource } from './infra/session-detail/session-detail.datasource';

@Module({
  imports: [],
  providers: [
    UserAnswerUsecase,
    SessionDetailUsecase,
    { provide: USER_ANSWER_REPOSITORY, useClass: UserAnswerDatasource },
    { provide: SESSION_DETAIL_REPOSITORY, useClass: SessionDetailDatasource },
    { provide: DATASOURCE_CLIENT, useValue: DatasourceClient.getInstance() },
  ],
  exports: [UserAnswerUsecase, SessionDetailUsecase],
})
export class CoreModule {}
