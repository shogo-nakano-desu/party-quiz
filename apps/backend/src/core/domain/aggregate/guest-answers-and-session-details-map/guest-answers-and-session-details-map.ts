import { SessionDetail } from '../../session-detail/session-detail';
import { GuestAnswer } from '../../guest-answer/guest-answer';

export class GuestAnswersAndSessionDetailsAggregate {
  readonly pairs: [GuestAnswer, SessionDetail][];

  public constructor(
    guestAnswers: GuestAnswer[],
    sessionDetails: SessionDetail[],
  ) {
    const pairs = new Map<GuestAnswer, SessionDetail>();
    // first, sort arrays
    guestAnswers.sort(
      (a, b) => a.requestedAt.getTime() - b.requestedAt.getTime(),
    );
    sessionDetails.sort(
      (a, b) => a.startedAt.getTime() - b.startedAt.getTime(),
    );

    //TODO: to increase performance, use binary search
    guestAnswers.forEach((answer) => {
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
        (a, b) =>
          a[0].guestId.localeCompare(b[0].guestId) ||
          b[0].requestedAt.getTime() - a[0].requestedAt.getTime(),
      )
      // filter only the latest answer
      .filter(
        (pair, i, pairs) =>
          i === 0 ||
          pair[0].guestId !== pairs[i - 1][0].guestId ||
          pair[1].id !== pairs[i - 1][1].id,
        // guestID & sessionDetailIDが同じものが存在しない場合OK
      );

    this.pairs = arrayOfPairs;
  }
}
