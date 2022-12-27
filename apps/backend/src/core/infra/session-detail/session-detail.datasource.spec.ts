import { TestingModule, Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { TestDb } from '../../../test-utils/test-db';
import { SessionDetailDatasource } from './session-detail.datasource';
import { SessionDetail } from '../../../core/domain/session-detail/session-detail';

describe('user-answer-datasource', () => {
  let testDb: TestDb;
  let client: PrismaClient;
  let datasource: SessionDetailDatasource;

  beforeEach(async () => {
    testDb = new TestDb();
    await testDb.setup();
    client = testDb.getClient();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionDetailDatasource,
        {
          provide: DATASOURCE_CLIENT,
          useValue: client,
        },
      ],
    }).compile();

    datasource = module.get<SessionDetailDatasource>(SessionDetailDatasource);
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  it('update', async () => {
    client.session_detail.update = jest.fn();
    const detail = SessionDetail.reconstruct({
      id: 'session_detail_id_1',
      number: 1,
      sessionId: 'session_id_1',
      questionId: 'question_id_1',
      startedAt: null,
      endedAt: null,
    });
    await datasource.update(detail);
    expect(client.session_detail.update).toHaveBeenCalledTimes(1);
  });
});
