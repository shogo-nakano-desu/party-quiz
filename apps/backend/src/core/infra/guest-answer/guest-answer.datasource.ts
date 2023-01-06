import { Inject, Injectable } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../constants';
import { GuestAnswerRepository } from 'src/core/domain/guest-answer/guest-answer.repository';
import { DatasourceClient } from '../datasource.client';
import { GuestAnswer } from 'src/core/domain/guest-answer/guest-answer';

@Injectable()
export class GuestAnswerDatasource implements GuestAnswerRepository {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}
  public async save(guestAnswer: GuestAnswer): Promise<void> {
    await this.client.guest_answer.create({
      data: {
        id: guestAnswer.id,
        guest_id: guestAnswer.guestId,
        session_id: guestAnswer.sessionId,
        answer: guestAnswer.answer,
        requested_at: guestAnswer.requestedAt,
      },
    });
  }
}
