import { Answer } from 'src/models/types';
import { IdFactory } from '../common/id-factory';

type BaseType = Omit<UserAnswer, 'constructor' | 'reconstruct' | 'create'>;
export class UserAnswer {
  static idPrefix = 'usas';
  readonly id: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly answer: Answer;
  readonly requestedAt: Date;
  private constructor(init: BaseType) {
    Object.assign(this, init);
  }

  public static reconstruct(init: BaseType): UserAnswer {
    return new UserAnswer(init);
  }

  public static create(init: Omit<BaseType, 'id' | 'idPrefix'>): UserAnswer {
    const id = new IdFactory().generate(this.idPrefix);
    return new UserAnswer({
      id,
      userId: init.userId,
      sessionId: init.sessionId,
      answer: init.answer,
      requestedAt: init.requestedAt,
    });
  }
}
