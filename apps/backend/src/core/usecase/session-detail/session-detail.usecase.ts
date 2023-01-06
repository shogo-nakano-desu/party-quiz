import { Injectable, Inject } from '@nestjs/common';
import { StartSessionDetailInputParams } from '../../../api/session-detail/start-session-detail-input';
import { SESSION_DETAIL_REPOSITORY } from '../../../core/constants';
import { SessionDetailRepository } from '../../../core/domain/session-detail/session-detail.repository';
import { SessionDetail } from '../../../core/domain/session-detail/session-detail';
import { EndSessionDetailInputParams } from '../../../api/session-detail/end-session-detail-input';

@Injectable()
export class SessionDetailUsecase {
  constructor(
    @Inject(SESSION_DETAIL_REPOSITORY)
    private readonly repository: SessionDetailRepository,
  ) {}

  async start(params: StartSessionDetailInputParams): Promise<void> {
    const currentSessionDetail = await this.repository.getById(
      params.sessionDetailId,
    );
    const updatedSessionDetail = SessionDetail.updateStartedAndEndedAt(
      params.startedAt,
      currentSessionDetail,
    );
    console.log(
      `updatedStartedAt: ${updatedSessionDetail.id} 
      startedAt: ${updatedSessionDetail.startedAt} 
      endedAt: ${updatedSessionDetail.endedAt}`,
    );
    await this.repository.update(updatedSessionDetail);
  }

  async end(params: EndSessionDetailInputParams): Promise<void> {
    const currentSessionDetail = await this.repository.getById(
      params.sessionDetailId,
    );
    const updatedSessionDetail = SessionDetail.updateEndedAt(
      params.endedAt,
      currentSessionDetail,
    );
    console.log(
      `updatedEndedAt: ${updatedSessionDetail.id} 
      startedAt: ${updatedSessionDetail.startedAt} 
      endedAt: ${updatedSessionDetail.endedAt}`,
    );
    await this.repository.update(updatedSessionDetail);
  }
}
