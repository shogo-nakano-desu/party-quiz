import { addSeconds } from 'date-fns';
import { SessionDetail } from './session-detail';

describe('session-detail', () => {
  it('reconstruct', () => {
    const now = new Date();
    const detail = generateSessionDetail(now);

    expect(detail.id).toStrictEqual('id');
    expect(detail.number).toStrictEqual(1);
    expect(detail.sessionId).toStrictEqual('session-id');
    expect(detail.questionId).toStrictEqual('question-id');
    expect(detail.startedAt.getTime()).toStrictEqual(now.getTime());
    expect(detail.endedAt.getTime()).toStrictEqual(now.getTime());
  });

  it('create', () => {
    const detail = SessionDetail.create({
      number: 1,
      sessionId: 'session-id',
      questionId: 'question-id',
      answer: 'option_1',
    });

    expect(detail.id.substring(0, 5)).toStrictEqual('sesd-');
    expect(detail.number).toStrictEqual(1);
    expect(detail.sessionId).toStrictEqual('session-id');
    expect(detail.questionId).toStrictEqual('question-id');
    expect(detail.answer).toStrictEqual('option_1');
    expect(detail.startedAt).toBeNull();
    expect(detail.endedAt).toBeNull();
  });

  it('update startedAt', () => {
    const now = new Date();
    const detail = generateSessionDetail(now);
    const after = new Date();
    const updatedDetail = SessionDetail.updateStartedAndEndedAt(after, detail);

    expect(updatedDetail).toStrictEqual(
      SessionDetail.reconstruct({
        id: 'id',
        number: 1,
        sessionId: 'session-id',
        questionId: 'question-id',
        answer: 'option_1',
        startedAt: after,
        endedAt: addSeconds(after, 30),
      }),
    );
  });

  it('update endedAt', () => {
    const now = new Date();
    const detail = generateSessionDetail(now);
    const after = new Date();
    const updatedDetail = SessionDetail.updateEndedAt(after, detail);

    expect(updatedDetail).toStrictEqual(
      SessionDetail.reconstruct({
        id: 'id',
        number: 1,
        sessionId: 'session-id',
        questionId: 'question-id',
        answer: 'option_1',
        startedAt: now,
        endedAt: after,
      }),
    );
  });
});

function generateSessionDetail(now: Date): SessionDetail {
  return SessionDetail.reconstruct({
    id: 'id',
    number: 1,
    sessionId: 'session-id',
    questionId: 'question-id',
    answer: 'option_1',
    startedAt: now,
    endedAt: now,
  });
}
