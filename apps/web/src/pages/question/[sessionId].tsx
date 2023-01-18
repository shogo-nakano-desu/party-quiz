import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  QuestionDto,
  useQuestionPageQuery,
  useStartSessionDetailMutation,
} from '../../../graphql';
import { useState } from 'react';
import { useEffect } from 'react';
import { addMilliseconds, addSeconds } from 'date-fns';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';

const QUESTION_OPTION_SIZE = 200;

function Question() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [{ data, fetching, error }] = useQuestionPageQuery({
    variables: { sessionId: `${sessionId}` },
  });
  const [question, setQuestion] = useState<QuestionDto>();
  const [_, startSessionDetail] = useStartSessionDetailMutation();

  useEffect(() => {
    if (data) {
      // sort ascending order by number
      const questions = data.listQuestions.sort((a, b) => a.number - b.number);
      if (questions.length > 0)
        questions.push({ ...questions[0], name: 'end' });
      const now = new Date();
      questions.forEach((q, i) => {
        setTimeout(() => {
          const start = addMilliseconds(addSeconds(now, i * 30), i * 1);
          setQuestion(q);
          if (i !== questions.length - 1) {
            startSessionDetail({
              input: {
                sessionDetailId: q.sessionDetailId,
                startedAt: start!.toISOString(),
              },
            });
          }
        }, 30001 * i);
      });
    }
  }, [fetching]);

  if (!data) return <p>There is no question...</p>;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>;
  if (!question) return <p>No question</p>;

  return (
    <Box background={BASE_COLOR} height={'100vh'} color={OTHER_COLOR}>
      <Flex direction={'column'} height={'100vh'}>
        <Box
          backgroundColor={OTHER_COLOR}
          width={10}
          height={10}
          position={'absolute'}
          top={0}
          left={0}
        ></Box>
        <Box
          margin={10}
          border={'1px'}
          height={'100vh'}
          borderColor={OTHER_COLOR}
        >
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            justifyContent={'space-around'}
            height={'90vh'}
          >
            {question.name === 'end' ? (
              <Heading size={'4xl'}>End</Heading>
            ) : (
              <>
                <Heading size={'4xl'} fontFamily={'Canela'}>
                  Q{question.number}
                </Heading>
                <Heading size={'2xl'}>{question.name}</Heading>
                <Grid templateColumns={'1fr 3fr'}>
                  <Image
                    src={'/buttons/quiz_a.png'}
                    alt={'button_a'}
                    width={QUESTION_OPTION_SIZE}
                    height={QUESTION_OPTION_SIZE}
                  />
                  <Heading
                    size={'3xl'}
                    lineHeight={'160px'}
                    textAlign={'center'}
                  >
                    {question.option_1}
                  </Heading>

                  <Image
                    src={'/buttons/quiz_b.png'}
                    alt={'button_b'}
                    width={QUESTION_OPTION_SIZE}
                    height={QUESTION_OPTION_SIZE}
                  />
                  <Heading
                    size={'3xl'}
                    lineHeight={'160px'}
                    textAlign={'center'}
                  >
                    {question.option_2}
                  </Heading>
                  <Image
                    src={'/buttons/quiz_c.png'}
                    alt={'button_c'}
                    width={QUESTION_OPTION_SIZE}
                    height={QUESTION_OPTION_SIZE}
                  />
                  <Heading
                    size={'3xl'}
                    lineHeight={'160px'}
                    textAlign={'center'}
                  >
                    {question.option_3}
                  </Heading>

                  <Image
                    src={'/buttons/quiz_d.png'}
                    alt={'button_d'}
                    width={QUESTION_OPTION_SIZE}
                    height={QUESTION_OPTION_SIZE}
                  />
                  <Heading
                    size={'3xl'}
                    lineHeight={'160px'}
                    textAlign={'center'}
                  >
                    {question.option_4}
                  </Heading>
                </Grid>
              </>
            )}
          </Flex>
        </Box>
        <Box
          backgroundColor={OTHER_COLOR}
          width={10}
          height={10}
          position={'absolute'}
          bottom={0}
          right={0}
        ></Box>
      </Flex>
    </Box>
  );
}

export default Question;
