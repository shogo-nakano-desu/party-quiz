import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuestionPageQuery } from '../../../graphql';
import { useState } from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';

const QUESTION_OPTION_SIZE = 200;

function Explanation() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [{ data, fetching, error }] = useQuestionPageQuery({
    variables: { sessionId: `${sessionId}` },
  });
  const questions = data?.listQuestions;
  const [number, setNumber] = useState(0);

  const next = () => {
    if (!questions) return;
    if (number + 1 < questions.length) {
      setNumber(number + 1);
    }
  };
  const back = () => {
    if (!questions) return;
    if (number - 1 >= 0) {
      setNumber(number - 1);
    }
  };

  if (!data) return <p>There is no question...</p>;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>;

  return questions ? (
    <>
      <Box background={BASE_COLOR} height={'100vh'} color={OTHER_COLOR}>
        <Flex direction={'column'} height={'100vh'}>
          <Box
            backgroundColor={OTHER_COLOR}
            width={10}
            height={10}
            position={'absolute'}
            top={0}
            left={0}
            onClick={() => back()}
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
              <Heading size={'4xl'} fontFamily={'Canela'}>
                Q{questions[number].number}
              </Heading>
              <Heading size={'2xl'}>{questions[number].name}</Heading>
              <Grid templateColumns={'1fr 3fr'}>
                <Image
                  src={'/buttons/quiz_a.png'}
                  alt={'button_a'}
                  width={QUESTION_OPTION_SIZE}
                  height={QUESTION_OPTION_SIZE}
                />
                <Heading size={'3xl'} lineHeight={'160px'} textAlign={'center'}>
                  {questions[number].option_1}
                </Heading>

                <Image
                  src={'/buttons/quiz_b.png'}
                  alt={'button_b'}
                  width={QUESTION_OPTION_SIZE}
                  height={QUESTION_OPTION_SIZE}
                />
                <Heading size={'3xl'} lineHeight={'160px'} textAlign={'center'}>
                  {questions[number].option_2}
                </Heading>
                <Image
                  src={'/buttons/quiz_c.png'}
                  alt={'button_c'}
                  width={QUESTION_OPTION_SIZE}
                  height={QUESTION_OPTION_SIZE}
                />
                <Heading size={'3xl'} lineHeight={'160px'} textAlign={'center'}>
                  {questions[number].option_3}
                </Heading>

                <Image
                  src={'/buttons/quiz_d.png'}
                  alt={'button_d'}
                  width={QUESTION_OPTION_SIZE}
                  height={QUESTION_OPTION_SIZE}
                />
                <Heading size={'3xl'} lineHeight={'160px'} textAlign={'center'}>
                  {questions[number].option_4}
                </Heading>
              </Grid>
            </Flex>
          </Box>
          <Box
            onClick={() => next()}
            backgroundColor={OTHER_COLOR}
            width={10}
            height={10}
            position={'absolute'}
            bottom={0}
            right={0}
          ></Box>
        </Flex>
      </Box>
    </>
  ) : (
    <p>There is no question...</p>
  );
}

export default Explanation;
