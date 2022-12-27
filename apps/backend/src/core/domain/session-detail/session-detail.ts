import { IdFactory } from '../common/id-factory';

type BaseType = Omit<SessionDetail, 'reconstruct' | 'create' | 'idPrefix'>;
export class SessionDetail {
  static idPrefix = 'sesd';
  readonly id: string;
  readonly number: number;
  readonly sessionId: string;
  readonly questionId: string;
  readonly startedAt: Date | null;
  readonly endedAt: Date | null;
  private constructor(init: BaseType) {
    Object.assign(this, init);
  }

  public static reconstruct(init: BaseType): SessionDetail {
    return new SessionDetail(init);
  }

  public static create(
    params: Omit<BaseType, 'id' | 'startedAt' | 'endedAt'>,
  ): SessionDetail {
    const id = new IdFactory().generate(this.idPrefix);
    return new SessionDetail({
      id,
      number: params.number,
      sessionId: params.sessionId,
      questionId: params.questionId,
      startedAt: null,
      endedAt: null,
    });
  }

  public static updateStartedAt(
    startedAt: Date,
    before: SessionDetail,
  ): SessionDetail {
    return new SessionDetail({ startedAt, ...before });
  }

  public static updateEndedAt(
    endedAt: Date,
    before: SessionDetail,
  ): SessionDetail {
    return new SessionDetail({ endedAt, ...before });
  }
}
