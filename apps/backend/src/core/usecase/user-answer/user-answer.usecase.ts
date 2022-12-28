import { Inject, Injectable } from '@nestjs/common';
import { UserAnswerInputParams } from '../../../api/user-answer/user-answer-input';
import { USER_ANSWER_REPOSITORY } from '../../../core/constants';
import { UserAnswer } from '../../../core/domain/user-answer/user-answer';
import { UserAnswerRepository } from '../../../core/domain/user-answer/user-answer.repository';

@Injectable()
export class UserAnswerUsecase {
  constructor(
    @Inject(USER_ANSWER_REPOSITORY)
    private readonly userAnswerRepository: UserAnswerRepository,
  ) {}

  async insertUserAnswer(params: UserAnswerInputParams): Promise<void> {
    await this.userAnswerRepository.save(
      UserAnswer.create({
        userId: params.userId,
        userName: '',
        sessionId: params.sessionId,
        answer: params.answer,
        requestedAt: params.requestedAt,
      }),
    );
  }
}
