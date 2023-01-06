import { GuestAnswer } from './guest-answer';

describe('guest-answer', () => {
  it('reconstruct', () => {
    const now = new Date();
    const answer = generateGuestAnswer(now);
    expect(answer.id).toStrictEqual('id');
    expect(answer.guestId).toStrictEqual('guest-id');
    expect(answer.sessionId).toStrictEqual('session-id');
    expect(answer.answer).toStrictEqual('option_1');
    expect(answer.requestedAt.getTime()).toStrictEqual(now.getTime());
  });

  it('create', () => {
    const now = new Date();
    const answer = GuestAnswer.create({
      guestId: 'guest-id',
      guestName: 'guest-name',
      sessionId: 'session-id',
      answer: 'option_1',
      requestedAt: now,
    });
    expect(answer.id.substring(0, 5)).toStrictEqual('usas-');
    expect(answer.guestId).toStrictEqual('guest-id');
    expect(answer.guestName).toStrictEqual('guest-name');
    expect(answer.sessionId).toStrictEqual('session-id');
    expect(answer.answer).toStrictEqual('option_1');
    expect(answer.requestedAt.getTime()).toStrictEqual(now.getTime());
  });
});

function generateGuestAnswer(now: Date): GuestAnswer {
  return GuestAnswer.reconstruct({
    id: 'id',
    guestId: 'guest-id',
    guestName: 'guest-name',
    sessionId: 'session-id',
    answer: 'option_1',
    requestedAt: now,
  });
}
