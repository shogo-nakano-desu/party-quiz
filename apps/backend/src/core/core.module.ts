import { Module } from '@nestjs/common';
import { UserAnswerUsecase } from './usecase/user-answer/user-answer.usecase';
import { DATASOURCE_CLIENT, USER_ANSWER_REPOSITORY } from './constants';
import { UserAnswerDatasource } from './infra/user-answer/user-answer.datasource';
import { DatasourceClient } from './infra/datasource.client';

@Module({
  imports: [],
  providers: [
    UserAnswerUsecase,
    { provide: USER_ANSWER_REPOSITORY, useClass: UserAnswerDatasource },
    { provide: DATASOURCE_CLIENT, useValue: DatasourceClient.getInstance() },
  ],
  exports: [UserAnswerUsecase],
})
export class CoreModule {}
