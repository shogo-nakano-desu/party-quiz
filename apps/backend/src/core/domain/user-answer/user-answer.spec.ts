import { UserAnswer } from './user-answer';

describe('user-answer', () => {
  it('reconstruct', () => {
    const now = new Date();
    const answer = generateUserAnswer(now);
    expect(answer.id).toStrictEqual('id');
    expect(answer.userId).toStrictEqual('user-id');
    expect(answer.sessionId).toStrictEqual('session-id');
    expect(answer.answer).toStrictEqual('option_1');
    expect(answer.requestedAt.getTime()).toStrictEqual(now.getTime());
  });

  it('create', () => {
    const now = new Date();
    const answer = UserAnswer.create({
      userId: 'user-id',
      userName: 'user-name',
      sessionId: 'session-id',
      answer: 'option_1',
      requestedAt: now,
    });
    expect(answer.id.substring(0, 5)).toStrictEqual('usas-');
    expect(answer.userId).toStrictEqual('user-id');
    expect(answer.userName).toStrictEqual('user-name');
    expect(answer.sessionId).toStrictEqual('session-id');
    expect(answer.answer).toStrictEqual('option_1');
    expect(answer.requestedAt.getTime()).toStrictEqual(now.getTime());
  });
});

function generateUserAnswer(now: Date): UserAnswer {
  return UserAnswer.reconstruct({
    id: 'id',
    userId: 'user-id',
    userName: 'user-name',
    sessionId: 'session-id',
    answer: 'option_1',
    requestedAt: now,
  });
}
