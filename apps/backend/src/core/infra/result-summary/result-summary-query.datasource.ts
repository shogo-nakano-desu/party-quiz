import { Injectable, Inject } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { DatasourceClient } from '../datasource.client';
import { ResultSummaryQueryService } from '../../../core/usecase/result-summary/query/result-summary-query-service';
import { SessionDetail } from '../../../core/domain/session-detail/session-detail';
import { GuestAnswer } from '../../../core/domain/guest-answer/guest-answer';
import { GuestAnswersAndSessionDetailsAggregate } from '../../../core/domain/aggregate/guest-answers-and-session-details-map/guest-answers-and-session-details-map';
import { ResultSummaryByGuestDto } from 'src/api/result-summary/result-summary-by-guest.dto';
import { ResultSummariesByGuests } from 'src/core/domain/aggregate/result-summary-by-guest/result-summary-by-guest';

@Injectable()
export class ResultSummaryQueryDatasource implements ResultSummaryQueryService {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}
  async getResultSummaries(
    sessionId: string,
  ): Promise<ResultSummaryByGuestDto[]> {
    const guestAnswers = (
      await this.client.guest_answer.findMany({
        where: { session_id: sessionId },
        include: { guest: { select: { name: true } } },
      })
    ).map((answer) =>
      GuestAnswer.reconstruct({
        id: answer.id,
        guestId: answer.guest_id,
        guestName: answer.guest.name,
        sessionId: answer.session_id,
        answer: answer.answer,
        requestedAt: answer.requested_at,
      }),
    );

    const sessionDetails = (
      await this.client.session_detail.findMany({
        where: { session_id: sessionId },
        include: { question: { select: { answer: true } } },
      })
    ).map((detail) => {
      return SessionDetail.reconstruct({
        id: detail.id,
        number: detail.number,
        sessionId: detail.session_id,
        questionId: detail.question_id,
        answer: detail.question.answer,
        startedAt: detail.started_at,
        endedAt: detail.ended_at,
      });
    });

    const aggs = new GuestAnswersAndSessionDetailsAggregate(
      guestAnswers,
      sessionDetails,
    );

    const resultSummaries = new ResultSummariesByGuests(
      aggs,
      [...new Set(sessionDetails.map((detail) => detail.questionId))].length,
    );
    return resultSummaries.resultSummariesByGuests.map((res) => {
      return new ResultSummaryByGuestDto({
        rank: res.rank,
        guestId: res.guestId,
        guestName: res.guestName,
        totalTime: res.totalTime,
        numberOfCollectAnswers: res.numberOfCollectAnswers,
        numberOfQuestions: res.numberOfQuestions,
      });
    });
  }
}
