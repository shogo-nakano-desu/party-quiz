import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { ResultSummaryByGuestDto } from '../src/api/result-summary/result-summary-by-guest.dto';
import { DatasourceClient } from '../src/core/infra/datasource.client';
import { IdFactory } from '../src/core/domain/common/id-factory';
import { QuestionDto } from 'src/api/question/question.dto';

const gql = '/graphql';

const guestIds: string[] = Array.from({ length: 10 }, (_, i) => i).map((_) =>
  IdFactory.generate('guest'),
);
const resultSummariesByGuests: ResultSummaryByGuestDto[] = [
  {
    rank: 1,
    guestId: guestIds[2],
    guestName: 'jane-doe',
    totalTime: 2000,
    numberOfCollectAnswers: 2,
    numberOfQuestions: 3,
  },
  {
    rank: 2,
    guestId: guestIds[1],
    guestName: 'john-doe',
    totalTime: 29000,
    numberOfCollectAnswers: 1,
    numberOfQuestions: 3,
  },
  {
    rank: 3,
    guestId: guestIds[0],
    guestName: 'shogo-nakano',
    totalTime: 34000,
    numberOfCollectAnswers: 1,
    numberOfQuestions: 3,
  },
];

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    client = DatasourceClient.getInstance();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('test list all questions in a session', async () => {
    const sessionIds = Array.from({ length: 10 }, (_, i) => i).map((_) =>
      IdFactory.generate('sesn'),
    );
    const questionIds: string[] = Array.from({ length: 10 }, (_, i) => i).map(
      (_) => IdFactory.generate('qstn'),
    );
    const sessionDetailIds: string[] = Array.from(
      { length: 10 },
      (_, i) => i,
    ).map((_) => IdFactory.generate('sesd'));

    await createQuestionSessionSessionDetail(
      client,
      [sessionIds[0], sessionDetailIds[1]],
      questionIds,
      sessionDetailIds,
    );

    const resultListQuestions: QuestionDto[] = [
      {
        sessionDetailId: sessionDetailIds[0],
        questionId: questionIds[0],
        number: 1,
        name: "What is Shogo's favorite food?",
        option_1: 'Strawberry',
        option_2: 'Chips',
        option_3: 'Grapes',
        option_4: 'Chocolate',
        answer: 'option_3',
      },
      {
        sessionDetailId: sessionDetailIds[1],
        questionId: questionIds[1],
        number: 2,
        name: 'How old is Shogo?',
        option_1: '19',
        option_2: '20',
        option_3: '27',
        option_4: '28',
        answer: 'option_3',
      },
      {
        sessionDetailId: sessionDetailIds[2],
        questionId: questionIds[2],
        number: 3,
        name: 'Where is the capital in Japan?',
        option_1: 'Tokyo',
        option_2: 'Kyoto',
        option_3: 'Osaka',
        option_4: 'Kobe',
        answer: 'option_1',
      },
    ];

    await await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `{
          listQuestions(sessionId: "${sessionIds[0]}") {
            sessionDetailId questionId number name option_1 option_2 option_3 option_4 answer
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.listQuestions).toStrictEqual(resultListQuestions);
      });
  });

  it('test get resultSummariesByGuests', async () => {
    const sessionId = IdFactory.generate('sesn');
    await createDataForTestResultSummary(client, sessionId, guestIds);
    await await request(app.getHttpServer())
      .post(gql)
      .send({
        query: `{
          getResultSummariesByGuests(sessionId: "${sessionId}") {
            rank guestId guestName totalTime numberOfCollectAnswers numberOfQuestions
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getResultSummariesByGuests).toStrictEqual(
          resultSummariesByGuests,
        );
      });
  });

  it('test start the session detail', async () => {
    const sessionId1 = IdFactory.generate('sesd');
    const sessionId2 = IdFactory.generate('sesd');
    await createDataForTestSessionDetail(client, sessionId1, sessionId2);
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {startSessionDetail(input: {
          sessionDetailId: "${sessionId1}" startedAt: "2022-12-25 03:11:34.21"
        })}`,
      })
      .expect(200);
  });

  it('test end the session detail', async () => {
    const sessionId1 = IdFactory.generate('sesd');
    const sessionId2 = IdFactory.generate('sesd');
    await createDataForTestSessionDetail(client, sessionId1, sessionId2);
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {endSessionDetail(input: {
          sessionDetailId: "${sessionId1}" endedAt: "2022-12-25 03:11:54.51"
        })}`,
      })
      .expect(200);
  });

  it('should create a new guest_answer and have it added to the array', async () => {
    const guestId = IdFactory.generate('guest');
    const sessionId = IdFactory.generate('sesn');
    await createDataForTestCreateGuestAnswer(client, guestId, sessionId);
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {createGuestAnswer(input: { 
              guestId: "${guestId}" answer: "option_4" sessionId: "${sessionId}" requestedAt: "2022-12-25 03:00:22.01" 
            })}`,
      })
      .expect(200);
  });
});

async function createDataForTestCreateGuestAnswer(
  client: PrismaClient,
  guestId: string,
  sessionId: string,
): Promise<void> {
  const now = new Date();
  await client.guest.create({
    data: {
      id: guestId,
      name: 'shogo',
      created_at: now,
    },
  });
  await client.session.create({
    data: {
      id: sessionId,
      name: 'name',
      created_at: now,
    },
  });
}

async function createQuestionSessionSessionDetail(
  client: PrismaClient,
  sessionIds: [string, string],
  questionIds: string[],
  sessionDetailIds: string[],
): Promise<void> {
  const now = new Date();
  await client.question.createMany({
    data: [
      {
        id: questionIds[0],
        name: "What is Shogo's favorite food?",
        option_1: 'Strawberry',
        option_2: 'Chips',
        option_3: 'Grapes',
        option_4: 'Chocolate',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: questionIds[1],
        name: 'How old is Shogo?',
        option_1: '19',
        option_2: '20',
        option_3: '27',
        option_4: '28',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: questionIds[2],
        name: 'Where is the capital in Japan?',
        option_1: 'Tokyo',
        option_2: 'Kyoto',
        option_3: 'Osaka',
        option_4: 'Kobe',
        answer: 'option_1',
        created_at: now,
      },
      {
        id: questionIds[3],
        name: 'Which programming language does shogo use?',
        option_1: 'OCaml',
        option_2: 'Rust',
        option_3: 'Closure',
        option_4: 'Kotlin',
        answer: 'option_2',
        created_at: now,
      },
      {
        id: questionIds[4],
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
        id: sessionIds[0],
        name: 'wedding-party',
        created_at: now,
      },
      {
        id: sessionIds[1],
        name: 'graduation-party',
        created_at: now,
      },
    ],
  });
  await client.session_detail.createMany({
    data: [
      {
        id: sessionDetailIds[0],
        number: 1,
        session_id: sessionIds[0],
        question_id: questionIds[0],
        started_at: new Date('2022-12-27 15:10:00'),
        ended_at: new Date('2022-12-27 15:10:30'),
      },
      {
        id: sessionDetailIds[1],
        number: 2,
        session_id: sessionIds[0],
        question_id: questionIds[1],
        started_at: new Date('2022-12-27 15:10:31'),
        ended_at: new Date('2022-12-27 15:11:01'),
      },
      {
        id: sessionDetailIds[2],
        number: 3,
        session_id: sessionIds[0],
        question_id: questionIds[2],
        started_at: new Date('2022-12-27 15:11:02'),
        ended_at: new Date('2022-12-27 15:11:32'),
      },
      {
        id: sessionDetailIds[3],
        number: 4,
        session_id: sessionIds[1],
        question_id: questionIds[3],
        started_at: new Date('2022-12-27 15:11:33'),
        ended_at: new Date('2022-12-27 15:12:03'),
      },
      {
        id: sessionDetailIds[4],
        number: 5,
        session_id: sessionIds[1],
        question_id: questionIds[4],
        started_at: new Date('2022-12-27 15:12:04'),
        ended_at: new Date('2022-12-27 15:12:34'),
      },
    ],
  });
}

async function createDataForTestResultSummary(
  client: PrismaClient,
  sessionId: string,
  guestIds: string[],
): Promise<void> {
  const now = new Date();
  const sessionId2 = IdFactory.generate('sesn');
  const questionIds: string[] = Array.from({ length: 10 }, (_, i) => i).map(
    (_) => IdFactory.generate('qstn'),
  );
  const sessionDetailIds: string[] = Array.from(
    { length: 10 },
    (_, i) => i,
  ).map((_) => IdFactory.generate('sesd'));

  const guestAnswerIds: string[] = Array.from({ length: 10 }, (_, i) => i).map(
    (_) => IdFactory.generate('usas'),
  );

  await client.guest.createMany({
    data: [
      {
        id: guestIds[0],
        name: 'shogo-nakano',
        created_at: now,
      },
      {
        id: guestIds[1],
        name: 'john-doe',
        created_at: now,
      },
      {
        id: guestIds[2],
        name: 'jane-doe',
        created_at: now,
      },
    ],
  });
  await createQuestionSessionSessionDetail(
    client,
    [sessionId, sessionId2],
    questionIds,
    sessionDetailIds,
  );
  await client.guest_answer.createMany({
    data: [
      {
        id: guestAnswerIds[0],
        guest_id: guestIds[0],
        session_id: sessionId,
        answer: 'option_4',
        requested_at: new Date('2022-12-27 15:10:02'),
      },
      {
        id: guestAnswerIds[1],
        guest_id: guestIds[0],
        session_id: sessionId,
        answer: 'option_2',
        requested_at: new Date('2022-12-27 15:10:05'),
      },
      {
        id: guestAnswerIds[2],
        guest_id: guestIds[1],
        session_id: sessionId,
        answer: 'option_3',
        requested_at: new Date('2022-12-27 15:10:32'),
      },
      {
        id: guestAnswerIds[3],
        guest_id: guestIds[2],
        session_id: sessionId,
        answer: 'option_3',
        requested_at: new Date('2022-12-27 15:10:01'),
      },
      {
        id: guestAnswerIds[4],
        guest_id: guestIds[0],
        session_id: sessionId,
        answer: 'option_1',
        requested_at: new Date('2022-12-27 15:11:31'),
      },
      {
        id: guestAnswerIds[5],
        guest_id: guestIds[2],
        session_id: sessionId,
        answer: 'option_1',
        requested_at: new Date('2022-12-27 15:11:03'),
      },
      {
        id: guestAnswerIds[6],
        guest_id: guestIds[1],
        session_id: sessionId,
        answer: 'option_3',
        requested_at: new Date('2022-12-27 15:11:00'),
      },
      {
        id: guestAnswerIds[7],
        guest_id: guestIds[1],
        session_id: sessionId,
        answer: 'option_3',
        requested_at: new Date('2022-12-27 15:10:34'),
      },
    ],
  });
}

async function createDataForTestSessionDetail(
  client: PrismaClient,
  sessionId1: string,
  sessionId2: string,
): Promise<void> {
  const now = new Date();
  const questionIds: string[] = Array.from({ length: 5 }, (_, i) => i).map(
    (_) => IdFactory.generate('qstn'),
  );
  const sessionDetailIds: string[] = Array.from({ length: 5 }, (_, i) => i).map(
    (_) => IdFactory.generate('sesd'),
  );
  await client.question.createMany({
    data: [
      {
        id: questionIds[0],
        name: "What is Shogo's favorite food?",
        option_1: 'Strawberry',
        option_2: 'Chips',
        option_3: 'Grapes',
        option_4: 'Chocolate',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: questionIds[1],
        name: 'How old is Shogo?',
        option_1: '19',
        option_2: '20',
        option_3: '27',
        option_4: '28',
        answer: 'option_3',
        created_at: now,
      },
      {
        id: questionIds[2],
        name: 'Where is the capital in Japan?',
        option_1: 'Tokyo',
        option_2: 'Kyoto',
        option_3: 'Osaka',
        option_4: 'Kobe',
        answer: 'option_1',
        created_at: now,
      },
      {
        id: questionIds[3],
        name: 'Which programming language does shogo use?',
        option_1: 'OCaml',
        option_2: 'Rust',
        option_3: 'Closure',
        option_4: 'Kotlin',
        answer: 'option_2',
        created_at: now,
      },
      {
        id: questionIds[4],
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
        id: sessionId1,
        name: 'wedding-party',
        created_at: now,
      },
      {
        id: sessionId2,
        name: 'graduation-party',
        created_at: now,
      },
    ],
  });
  await client.session_detail.createMany({
    data: [
      {
        id: sessionDetailIds[0],
        number: 1,
        session_id: sessionId1,
        question_id: questionIds[0],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[1],
        number: 2,
        session_id: sessionId1,
        question_id: questionIds[1],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[2],
        number: 3,
        session_id: sessionId1,
        question_id: questionIds[2],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[3],
        number: 4,
        session_id: sessionId2,
        question_id: questionIds[3],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[4],
        number: 5,
        session_id: sessionId2,
        question_id: questionIds[4],
        started_at: null,
        ended_at: null,
      },
    ],
  });
}
