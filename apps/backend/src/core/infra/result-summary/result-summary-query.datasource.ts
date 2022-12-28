import { Injectable, Inject } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { DatasourceClient } from '../datasource.client';
import { ResultSummaryQueryService } from '../../../core/usecase/result-summary/query/result-summary-query-service';
import { ResultSummaryByUserDto } from '../../../api/result-summary/result-summary-by-user.dto';
import { SessionDetail } from '../../../core/domain/session-detail/session-detail';
import { UserAnswer } from '../../../core/domain/user-answer/user-answer';
import { UserAnswersAndSessionDetailsAggregate } from '../../../core/domain/aggregate/user-answers-and-session-details-map/user-answers-and-session-details-map';
import { ResultSummariesByUsers } from '../../../core/domain/aggregate/result-summary-by-user/result-summary-by-user';

@Injectable()
export class ResultSummaryQueryDatasource implements ResultSummaryQueryService {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}
  async getResultSummaries(
    sessionId: string,
  ): Promise<ResultSummaryByUserDto[]> {
    const userAnswers = (
      await this.client.user_answer.findMany({
        where: { session_id: sessionId },
        include: { user: { select: { name: true } } },
      })
    ).map((answer) =>
      UserAnswer.reconstruct({
        id: answer.id,
        userId: answer.user_id,
        userName: answer.user.name,
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

    const aggs = new UserAnswersAndSessionDetailsAggregate(
      userAnswers,
      sessionDetails,
    );

    const resultSummaries = new ResultSummariesByUsers(
      aggs,
      [...new Set(sessionDetails.map((detail) => detail.questionId))].length,
    );
    return resultSummaries.resultSummariesByUsers.map((res) => {
      return new ResultSummaryByUserDto({
        rank: res.rank,
        userId: res.userId,
        userName: res.userName,
        totalTime: res.totalTime,
        numberOfCollectAnswers: res.numberOfCollectAnswers,
        numberOfQuestions: res.numberOfQuestions,
      });
    });
  }
}
