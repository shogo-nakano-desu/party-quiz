import { PrismaClient } from '@prisma/client';
import { userList } from './guestList';

const prisma = new PrismaClient();
async function main() {
  const sessionIds: [string, string] = ['sesn-1', 'sesn-2'];
  const questionIds = ['qstn-1', 'qstn-2', 'qstn-3', 'qstn-4', 'qstn-5'];
  const sessionDetailIds = ['sesd-1', 'sesd-2', 'sesd-3', 'sesd-4', 'sesd-5'];

  await createQuestionSessionSessionDetail(
    prisma,
    sessionIds,
    questionIds,
    sessionDetailIds,
  );

  await prisma.guest.createMany({
    data: userList,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

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
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[1],
        number: 2,
        session_id: sessionIds[0],
        question_id: questionIds[1],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[2],
        number: 3,
        session_id: sessionIds[0],
        question_id: questionIds[2],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[3],
        number: 4,
        session_id: sessionIds[1],
        question_id: questionIds[3],
        started_at: null,
        ended_at: null,
      },
      {
        id: sessionDetailIds[4],
        number: 5,
        session_id: sessionIds[1],
        question_id: questionIds[4],
        started_at: null,
        ended_at: null,
      },
    ],
  });
}
