import { SessionDetail } from '../../session-detail/session-detail';
import { UserAnswer } from '../../user-answer/user-answer';

export class UserAnswersAndSessionDetailsAggregate {
  readonly pairs: [UserAnswer, SessionDetail][];

  public constructor(
    userAnswers: UserAnswer[],
    sessionDetails: SessionDetail[],
  ) {
    const pairs = new Map<UserAnswer, SessionDetail>();
    // first, sort arrays
    userAnswers.sort(
      (a, b) => a.requestedAt.getTime() - b.requestedAt.getTime(),
    );
    sessionDetails.sort(
      (a, b) => a.startedAt.getTime() - b.startedAt.getTime(),
    );

    //TODO: to increase performance, use binary search
    userAnswers.forEach((answer) => {
      sessionDetails.forEach((detail) => {
        const answerRequestedAt = answer.requestedAt.getTime();
        if (
          answerRequestedAt >= detail.startedAt.getTime() &&
          answerRequestedAt <= detail.endedAt.getTime()
        ) {
          pairs.set(answer, detail);
        }
      });
    });
    const arrayOfPairs = Array.from(pairs.entries())
      .sort(
        // asc
        (a, b) => b[0].requestedAt.getTime() - a[0].requestedAt.getTime(),
      )
      // filter only the latest answer
      .filter(
        (pair, i, pairs) =>
          i === 0 ||
          pair[0].userId !== pairs[i - 1][0].userId ||
          pair[1].id !== pairs[i - 1][1].id,
      );

    this.pairs = arrayOfPairs;
  }
}
