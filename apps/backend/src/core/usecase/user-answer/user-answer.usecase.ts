import { Inject, Injectable } from '@nestjs/common';
import { UserAnswerInputParams } from 'src/api/user-answer/user-answer-input';
import { USER_ANSWER_REPOSITORY } from '../../../core/constants';
import { UserAnswer } from '../../../core/domain/user-answer/user-answer';
import { UserAnswerRepository } from 'src/core/domain/user-answer/user-answer.repository';

@Injectable()
export class UserAnswerUsecase {
  constructor(
    @Inject(USER_ANSWER_REPOSITORY)
    private readonly repository: UserAnswerRepository,
  ) {}

  async insertUserAnswer(params: UserAnswerInputParams): Promise<void> {
    this.repository.save(
      UserAnswer.create({
        userId: params.userId,
        sessionId: params.sessionId,
        answer: params.answer,
        requestedAt: params.requestedAt,
      }),
    );
  }
}
