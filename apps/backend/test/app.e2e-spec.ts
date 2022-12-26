import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  it('should create a new user_answer and have it added to the array', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `mutation {createUserAnswer(input: { 
              userId: "user_id_3" answer: "option_4" sessionId: "session_1" requestedAt: "2022-12-25 03:00:22" 
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
