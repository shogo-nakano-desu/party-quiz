import { TestingModule, Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DATASOURCE_CLIENT } from '../../constants';
import { TestDb } from '../../../test-utils/test-db';
import { GuestAnswerDatasource } from './guest-answer.datasource';
import { GuestAnswer } from '../../domain/guest-answer/guest-answer';

describe('guest-answer-datasource', () => {
  let testDb: TestDb;
  let client: PrismaClient;
  let datasource: GuestAnswerDatasource;

  beforeEach(async () => {
    testDb = new TestDb();
    await testDb.setup();
    client = testDb.getClient();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestAnswerDatasource,
        {
          provide: DATASOURCE_CLIENT,
          useValue: client,
        },
      ],
    }).compile();

    datasource = module.get<GuestAnswerDatasource>(GuestAnswerDatasource);
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  it('save', async () => {
    client.guest_answer.create = jest.fn();
    const guestAnswer = GuestAnswer.reconstruct({
      id: 'id_1',
      guestId: 'guest_id_1',
      guestName: 'guest_name_1',
      sessionId: 'session_id_1',
      answer: 'option_1',
      requestedAt: new Date('2022-11-20 12:51:10.20'),
    });
    await datasource.save(guestAnswer);
    expect(client.guest_answer.create).toHaveBeenCalledTimes(1);
  });
});
