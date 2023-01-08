import { Answer } from 'src/models/types';
import { IdFactory } from '../common/id-factory';

type BaseType = Omit<GuestAnswer, 'constructor' | 'reconstruct' | 'create'>;
export class GuestAnswer {
  static idPrefix = 'gsas';
  readonly id: string;
  readonly guestId: string;
  readonly guestName: string;
  readonly sessionId: string;
  readonly answer: Answer;
  readonly requestedAt: Date;
  private constructor(init: BaseType) {
    Object.assign(this, init);
  }

  public static reconstruct(init: BaseType): GuestAnswer {
    return new GuestAnswer(init);
  }

  public static create(init: Omit<BaseType, 'id' | 'idPrefix'>): GuestAnswer {
    const id = IdFactory.generate(this.idPrefix);
    return new GuestAnswer({
      id,
      guestId: init.guestId,
      guestName: init.guestName,
      sessionId: init.sessionId,
      answer: init.answer,
      requestedAt: init.requestedAt,
    });
  }
}
