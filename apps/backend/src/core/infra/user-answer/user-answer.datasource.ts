import { Inject, Injectable } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { UserAnswerRepository } from 'src/core/domain/user-answer/user-answer.repository';
import { DatasourceClient } from '../datasource.client';
import { UserAnswer } from 'src/core/domain/user-answer/user-answer';

@Injectable()
export class UserAnswerDatasource implements UserAnswerRepository {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}
  public async save(userAnswer: UserAnswer): Promise<void> {
    await this.client.user_answer.create({
      data: {
        id: userAnswer.id,
        user_id: userAnswer.userId,
        session_id: userAnswer.sessionId,
        answer: userAnswer.answer,
        requested_at: userAnswer.requestedAt,
      },
    });
  }
}
