import { Answer } from 'src/models/types';

export class UserAnswer {
  readonly userId: string;
  readonly sessionId: string;
  readonly answer: Answer;
  readonly requestedAt: Date;
  private constructor(init: Omit<UserAnswer, 'reconstruct' | 'create'>) {
    Object.assign(this, init);
  }

  public static reconstruct(init: Omit<UserAnswer, 'reconstruct'>): UserAnswer {
    return new UserAnswer(init);
  }
}
