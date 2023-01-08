import { Inject, Injectable } from '@nestjs/common';
import { GuestAnswerInputParams } from '../../../api/guest-answer/guest-answer-input';
import { USER_ANSWER_REPOSITORY } from '../../constants';
import { GuestAnswer } from '../../domain/guest-answer/guest-answer';
import { GuestAnswerRepository } from '../../domain/guest-answer/guest-answer.repository';

@Injectable()
export class GuestAnswerUsecase {
  constructor(
    @Inject(USER_ANSWER_REPOSITORY)
    private readonly guestAnswerRepository: GuestAnswerRepository,
  ) {}

  async insertGuestAnswer(params: GuestAnswerInputParams): Promise<void> {
    await this.guestAnswerRepository.save(
      GuestAnswer.create({
        guestId: params.guestId,
        guestName: '',
        sessionId: params.sessionId,
        answer: params.answer,
        requestedAt: params.requestedAt,
      }),
    );
  }
}
