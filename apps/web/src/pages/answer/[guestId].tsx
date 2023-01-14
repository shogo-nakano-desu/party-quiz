import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateAnswerMutation } from '../../../graphql';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useControllableState } from '@chakra-ui/react';

const answers = ['option_1', 'option_2', 'option_3', 'option_4'] as const;
type Answer = (typeof answers)[number];

function Answer() {
  const router = useRouter();
  const { guestId } = router.query;
  const [_, createAnswer] = useCreateAnswerMutation();
  // TODO set session id
  const sessionId = 'sesn-1';
  const [answer, setAnswer] = useState<Answer>('option_1');
  const [internalAnswer, setInternalAnswer] = useControllableState({
    value: answer,
    onChange: setAnswer,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log('clicked');
    if (internalAnswer) {
      if (!isString(guestId)) {
        throw new Error(
          `guestId should be a string. current guestId: ${guestId}`,
        );
      }
      setIsLoading(true);
      const res = await createAnswer({
        input: {
          answer: internalAnswer,
          guestId,
          requestedAt: new Date().toISOString(),
          sessionId,
        },
      });
      if (res) setIsLoading(false);
    }
  };
  const BASE_COLOR = '#E7C2A8';
  const OTHER_COLOR = '#7A45A0';
  const ACTIVE_BUTTON_COLOR = '#6473FFB2';

  return (
    <Box background={'#E7C2A8'} height={'100vh'}>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        gridGap={5}
        height={'100vh'}
      >
        <Heading size={'3xl'} color={OTHER_COLOR}>
          Answer
        </Heading>
        <Box
          rounded={'base'}
          fontSize={40}
          width={'80%'}
          height={'8%'}
          as="button"
          color={BASE_COLOR}
          background={answer === 'option_1' ? ACTIVE_BUTTON_COLOR : OTHER_COLOR}
          onClick={() => setInternalAnswer('option_1')}
        >
          A
        </Box>
        <Box
          rounded={'base'}
          fontSize={40}
          width={'80%'}
          height={'8%'}
          as="button"
          color={BASE_COLOR}
          background={answer === 'option_2' ? ACTIVE_BUTTON_COLOR : OTHER_COLOR}
          onClick={() => setInternalAnswer('option_2')}
        >
          B
        </Box>
        <Box
          rounded={'base'}
          fontSize={40}
          width={'80%'}
          height={'8%'}
          as="button"
          color={BASE_COLOR}
          background={answer === 'option_3' ? ACTIVE_BUTTON_COLOR : OTHER_COLOR}
          onClick={() => setInternalAnswer('option_3')}
        >
          C
        </Box>
        <Box
          rounded={'base'}
          fontSize={40}
          width={'80%'}
          height={'8%'}
          as="button"
          color={BASE_COLOR}
          background={answer === 'option_4' ? ACTIVE_BUTTON_COLOR : OTHER_COLOR}
          onClick={() => setInternalAnswer('option_4')}
        >
          D
        </Box>
        <Button
          fontSize={30}
          height={'8%'}
          width={'60%'}
          rounded={'base'}
          color={OTHER_COLOR}
          background={BASE_COLOR}
          borderColor={OTHER_COLOR}
          borderWidth={'4px'}
          isLoading={isLoading}
          onClick={onClick}
        >
          SEND
        </Button>
      </Flex>
    </Box>
  );
}
export default Answer;

function isString(str: any): str is string {
  return typeof str === 'string';
}
