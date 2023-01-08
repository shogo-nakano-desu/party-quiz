import { GuestAnswersAndSessionDetailsAggregate } from '../guest-answers-and-session-details-map/guest-answers-and-session-details-map';

type AfterCalcResultSummary = Omit<ResultSummaryByGuest, 'rank'> & {
  rank: number;
};

export class ResultSummariesByGuests {
  readonly resultSummariesByGuests: AfterCalcResultSummary[];

  // 回答がどのsessionに入っているか判断しつつ、おなじsessionに対しての複数回の回答は最後だけを有効にする必要がある。
  constructor(
    aggs: GuestAnswersAndSessionDetailsAggregate,
    numberOfQuestions: number,
  ) {
    const resultSummariesMap = new Map<string, ResultSummaryByGuest>();
    for (const [answer, detail] of aggs.pairs) {
      if (resultSummariesMap.has(answer.guestId)) {
        resultSummariesMap.set(
          answer.guestId,
          ResultSummaryByGuest.updateTotalTimeAndNumberOfCollectAnswers({
            resultSummary: resultSummariesMap.get(answer.guestId),
            time: answer.requestedAt.getTime() - detail.startedAt.getTime(),
            isCollect: answer.answer === detail.answer,
          }),
        );
      } else {
        resultSummariesMap.set(
          answer.guestId,
          new ResultSummaryByGuest({
            rank: null,
            guestId: answer.guestId,
            guestName: answer.guestName,
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
    this.resultSummariesByGuests = resultSummaries.map((res, i) => {
      return ResultSummaryByGuest.updateRank(res, i + 1);
    });
  }
}

class ResultSummaryByGuest {
  readonly rank: number | null;
  readonly guestId: string;
  readonly guestName: string;
  readonly totalTime: number;
  readonly numberOfCollectAnswers: number;
  readonly numberOfQuestions: number;

  constructor(
    init: Omit<
      ResultSummaryByGuest,
      'updateTotalTimeAndNumberOfCollectAnswers'
    >,
  ) {
    Object.assign(this, init);
  }

  public static updateRank(
    resultSummary: ResultSummaryByGuest,
    rank: number,
  ): AfterCalcResultSummary {
    return new ResultSummaryByGuest({ ...resultSummary, rank });
  }

  public static updateTotalTimeAndNumberOfCollectAnswers(params: {
    resultSummary: ResultSummaryByGuest;
    time: number;
    isCollect: boolean;
  }): ResultSummaryByGuest {
    return new ResultSummaryByGuest({
      ...params.resultSummary,
      totalTime: params.resultSummary.totalTime + params.time,
      numberOfCollectAnswers: params.isCollect
        ? params.resultSummary.numberOfCollectAnswers + 1
        : params.resultSummary.numberOfCollectAnswers,
    });
  }
}
