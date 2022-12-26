import { TestingModule, Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { TestDB } from '../../../test-utils/test-db';
import { UserAnswerDatasource } from './user-answer.datasource';
import { UserAnswer } from '../../../core/domain/user-answer/user-answer';

describe('user-answer-datasource', () => {
  let testDb: TestDB;
  let client: PrismaClient;
  let datasource: UserAnswerDatasource;

  beforeEach(async () => {
    testDb = new TestDB();
    await testDb.setup();
    client = testDb.getClient();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAnswerDatasource,
        {
          provide: DATASOURCE_CLIENT,
          useValue: client,
        },
      ],
    }).compile();

    datasource = module.get<UserAnswerDatasource>(UserAnswerDatasource);
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  it('save', async () => {
    client.user_answer.create = jest.fn();
    const userAnswer = UserAnswer.reconstruct({
      userId: 'user_id_1',
      sessionId: 'session_id_1',
      answer: 'option_1',
      requestedAt: new Date('2022-11-20 12:51:10.20'),
    });
    await datasource.save(userAnswer);
    expect(client.user_answer.create).toHaveBeenCalledTimes(1);
  });
});
