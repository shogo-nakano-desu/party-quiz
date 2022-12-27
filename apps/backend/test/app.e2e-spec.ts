import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { TestDb } from '../src/test-utils/test-db';
import { DATASOURCE_CLIENT } from '../src/core/constants';

const gql = '/graphql';

// TODO remove comments when mutation implementation is done and can test getAllUserAnswers
// const cats: UserAnswerDto[] = [
//   {
//     user_id: 'user_id_1',
//     question_id: 'question_id_1',
//     answer: 'option_1',
//     requested_at: new Date('2022-12-25 03:00:12.10'),
//   },
//   {
//     user_id: 'user_id_2',
//     question_id: 'question_id_1',
//     answer: 'option_2',
//     requested_at: new Date('2022-12-25 03:00:17.24'),
//   },
//   {
//     user_id: 'user_id_1',
//     question_id: 'question_id_1',
//     answer: 'option_3',
//     requested_at: new Date('2022-12-25 03:00:21.33'),
//   },
// ];

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testDb: TestDb;
  let client: PrismaClient;

  beforeEach(async () => {
    testDb = new TestDb();
    await testDb.setup();
    client = testDb.getClient();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: DATASOURCE_CLIENT,
          useValue: client,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('test get request', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: '{getUserAnswers {user_id question_id answer requested_at}}',
      })
      .expect(200);
  });

  it('test result summary', async () => {
    await createDataForTestResultSummary(client);
    await await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {getResultSummary(input: {
        sessionId: "sesn-01GN91BR81PW78RTFTC54KZ6R1"
      })}`,
      })
      .expect(200);
  });

  it('test start the session detail', async () => {
    await createDataForTestSessionDetail(client);
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {startSessionDetail(input: {
          sessionDetailId: "sesd-01GN91JE0MQWSZEQQCFWNHMK12" startedAt: "2022-12-25 03:11:34.21"
        })}`,
      })
      .expect(200);
  });

  it('test end the session detail', async () => {
    await createDataForTestSessionDetail(client);
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {endSessionDetail(input: {
          sessionDetailId: "sesd-01GN91JE0MQWSZEQQCFWNHMK12" endedAt: "2022-12-25 03:11:54.51"
        })}`,
      })
      .expect(200);
  });

  it('should create a new user_answer and have it added to the array', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {createUserAnswer(input: { 
              userId: "user_id_3" answer: "option_4" sessionId: "session_1" requestedAt: "2022-12-25 03:00:22.01" 
            })}`,
      })
      .expect(200);

    //// chain another request to see our original one works as expected
    // .then(() =>
    //   request(app.getHttpServer())
    //     .post(gql)
    //     .send({ query: '{get {user_id question_id answer requested_at}}' })
    //     .expect(200)
    //     .expect((res) => {
    //       expect(res.body.data.getUserAnswers).toEqual(
    //         cats.concat([
    //           {
    //             user_id: 'user_id_3',
    //             question_id: 'question_id_1',
    //             answer: 'option_4',
    //             requested_at: new Date('2022-12-25 03:00:22.05'),
    //           },
    //         ]),
    //       );
    //     }),
    // )
  });
});

async function createDataForTestResultSummary(
  client: PrismaClient,
): Promise<void> {
  const now = new Date();
  await client.user.createMany({
    data: [
      {
        id: 'user-01GN9VQXXW4A7PVAKJ0K1SJQ8H',
        name: 'shogo-nakano',
        created_at: now,
      },
      {
        id: 'user-01GN9VR69NMH6EGB8JCWEYW3HN',
        name: 'john-doe',
        created_at: now,
      },
      {
        id: 'user-01GN9VRAH446E00EGEXTHBW536',
        name: 'jane-doe',
        created_at: now,
      },
    ],
  });
}

async function createDataForTestSessionDetail(
  client: PrismaClient,
): Promise<void> {
  const now = new Date();
  await client.question.createMany({
    data: [
      {
        id: 'qstn-01GN91E8J83HWKXHGJP59NJ7Z4',
        name: "What is Shogo's favorite food?",
        option_1: 'Strawberry',
        option_2: 'Chips',
        option_3: 'Grapes',
        option_4: 'Chocolate',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: 'qstn-01GN91F8WJ71Y0SD1BMR28Q1JJ',
        name: 'How old is Shogo?',
        option_1: '19',
        option_2: '20',
        option_3: '27',
        option_4: '28',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: 'qstn-01GN91FDG1VWQHYFGBZV0N3H99',
        name: 'Where is the capital in Japan?',
        option_1: 'Tokyo',
        option_2: 'Kyoto',
        option_3: 'Osaka',
        option_4: 'Kobe',
        answer: 'option_1',
        created_at: now,
      },
      {
        id: 'qstn-01GN91FHHHDY0Y3X9BNJV0X358',
        name: 'Which programming language does shogo use?',
        option_1: 'OCaml',
        option_2: 'Rust',
        option_3: 'Closure',
        option_4: 'Kotlin',
        answer: 'option_2',
        created_at: now,
      },
      {
        id: 'qstn-01GN91FPN219QE2BKEXTYXGJ04',
        name: "When is Shogo's birthday?",
        option_1: '24th Dec',
        option_2: '18th Aug',
        option_3: '15th Jan',
        option_4: '16th May',
        answer: 'option_4',
        created_at: now,
      },
    ],
  });
  await client.session.createMany({
    data: [
      {
        id: 'sesn-01GN91BR81PW78RTFTC54KZ6R1',
        name: 'wedding-party',
        created_at: now,
      },
      {
        id: 'sesn-01GN91C8CP9GENV0A67RMM9CEX',
        name: 'graduation-party',
        created_at: now,
      },
    ],
  });
  await client.session_detail.createMany({
    data: [
      {
        id: 'sesd-01GN91JE0MQWSZEQQCFWNHMK12',
        number: 1,
        session_id: 'sesn-01GN91BR81PW78RTFTC54KZ6R1',
        question_id: 'qstn-01GN91E8J83HWKXHGJP59NJ7Z4',
        started_at: null,
        ended_at: null,
      },
      {
        id: 'sesd-01GN91JK71QTZ876P53JFT8FGR',
        number: 2,
        session_id: 'sesn-01GN91BR81PW78RTFTC54KZ6R1',
        question_id: 'qstn-01GN91F8WJ71Y0SD1BMR28Q1JJ',
        started_at: null,
        ended_at: null,
      },
      {
        id: 'sesd-01GN91JR0S36W7MMV1AV6D3B0F',
        number: 3,
        session_id: 'sesn-01GN91BR81PW78RTFTC54KZ6R1',
        question_id: 'qstn-01GN91FDG1VWQHYFGBZV0N3H99',
        started_at: null,
        ended_at: null,
      },
      {
        id: 'sesd-01GN91JWEZCRKTCEM8F61EB5Q5',
        number: 4,
        session_id: 'sesn-01GN91C8CP9GENV0A67RMM9CEX',
        question_id: 'qstn-01GN91FHHHDY0Y3X9BNJV0X358',
        started_at: null,
        ended_at: null,
      },
      {
        id: 'sesd-01GN91K2H8BART98VKP2Q3FP3Z',
        number: 5,
        session_id: 'sesn-01GN91C8CP9GENV0A67RMM9CEX',
        question_id: 'qstn-01GN91FPN219QE2BKEXTYXGJ04',
        started_at: null,
        ended_at: null,
      },
    ],
  });
}
