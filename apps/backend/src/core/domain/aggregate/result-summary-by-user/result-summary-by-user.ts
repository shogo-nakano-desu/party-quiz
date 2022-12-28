import { UserAnswersAndSessionDetailsAggregate } from '../user-answers-and-session-details-map/user-answers-and-session-details-map';

type AfterCalcResultSummary = Omit<ResultSummaryByUser, 'rank'> & {
  rank: number;
};

export class ResultSummariesByUsers {
  readonly resultSummariesByUsers: AfterCalcResultSummary[];

  // 回答がどのsessionに入っているか判断しつつ、おなじsessionに対しての複数回の回答は最後だけを有効にする必要がある。
  constructor(
    aggs: UserAnswersAndSessionDetailsAggregate,
    numberOfQuestions: number,
  ) {
    const resultSummariesMap = new Map<string, ResultSummaryByUser>();
    for (const [answer, detail] of aggs.pairs) {
      if (resultSummariesMap.has(answer.userId)) {
        resultSummariesMap.set(
          answer.userId,
          ResultSummaryByUser.updateTotalTimeAndNumberOfCollectAnswers({
            resultSummary: resultSummariesMap.get(answer.userId),
            time: answer.requestedAt.getTime() - detail.startedAt.getTime(),
            isCollect: answer.answer === detail.answer,
          }),
        );
      } else {
        resultSummariesMap.set(
          answer.userId,
          new ResultSummaryByUser({
            rank: null,
            userId: answer.userId,
            userName: answer.userName,
            totalTime:
              answer.requestedAt.getTime() - detail.startedAt.getTime(),
            numberOfCollectAnswers: answer.answer === detail.answer ? 1 : 0,
            numberOfQuestions,
          }),
        );
      }
    }
    const resultSummaries = Array.from(resultSummariesMap.values()).sort(
      (a, b) => {
        if (a.numberOfCollectAnswers === b.numberOfCollectAnswers) {
          // desc
          return a.totalTime - b.totalTime;
        }
        // asc
        return b.numberOfCollectAnswers - a.numberOfCollectAnswers;
      },
    );
    this.resultSummariesByUsers = resultSummaries.map((res, i) => {
      return ResultSummaryByUser.updateRank(res, i + 1);
    });
  }
}

class ResultSummaryByUser {
  readonly rank: number | null;
  readonly userId: string;
  readonly userName: string;
  readonly totalTime: number;
  readonly numberOfCollectAnswers: number;
  readonly numberOfQuestions: number;

  constructor(
    init: Omit<ResultSummaryByUser, 'updateTotalTimeAndNumberOfCollectAnswers'>,
  ) {
    Object.assign(this, init);
  }

  public static updateRank(
    resultSummary: ResultSummaryByUser,
    rank: number,
  ): AfterCalcResultSummary {
    return new ResultSummaryByUser({ ...resultSummary, rank });
  }

  public static updateTotalTimeAndNumberOfCollectAnswers(params: {
    resultSummary: ResultSummaryByUser;
    time: number;
    isCollect: boolean;
  }): ResultSummaryByUser {
    return new ResultSummaryByUser({
      ...params.resultSummary,
      totalTime: params.resultSummary.totalTime + params.time,
      numberOfCollectAnswers: params.isCollect
        ? params.resultSummary.numberOfCollectAnswers + 1
        : params.resultSummary.numberOfCollectAnswers,
    });
  }
}
