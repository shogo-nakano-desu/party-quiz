import { Inject, Injectable } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { DatasourceClient } from '../datasource.client';
import { SessionDetailRepository } from '../../../core/domain/session-detail/session-detail.repository';
import { SessionDetail } from '../../../core/domain/session-detail/session-detail';

@Injectable()
export class SessionDetailDatasource implements SessionDetailRepository {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}

  public async getById(id: string): Promise<SessionDetail> {
    const detail = await this.client.session_detail.findUniqueOrThrow({
      where: { id },
    });
    return SessionDetail.reconstruct({
      id: detail.id,
      number: detail.number,
      sessionId: detail.session_id,
      questionId: detail.question_id,
      startedAt: detail.started_at,
      endedAt: detail.ended_at,
    });
  }

  public async update(detail: SessionDetail): Promise<void> {
    await this.client.session_detail.update({
      where: { id: detail.id },
      data: {
        id: detail.id,
        number: detail.number,
        session_id: detail.sessionId,
        question_id: detail.questionId,
        started_at: detail.startedAt,
        ended_at: detail.endedAt,
      },
    });
  }
}
