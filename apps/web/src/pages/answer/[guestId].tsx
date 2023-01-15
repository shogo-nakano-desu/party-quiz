import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useControllableState } from '@chakra-ui/react';
import { useCreateAnswerMutation } from '../../../graphql';
import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';

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

  const buttons: { name: Answer; normal: string; hover: string }[] = [
    {
      name: 'option_1',
      normal: '/buttons/a.png',
      hover: '/buttons/a_hover.png',
    },
    {
      name: 'option_2',
      normal: '/buttons/b.png',
      hover: '/buttons/b_hover.png',
    },
    {
      name: 'option_3',
      normal: '/buttons/c.png',
      hover: '/buttons/c_hover.png',
    },
    {
      name: 'option_4',
      normal: '/buttons/d.png',
      hover: '/buttons/d_hover.png',
    },
  ];

  return (
    <Box background={BASE_COLOR} height={'100vh'}>
      <Flex
        direction={'column'}
        justify={'end'}
        align={'center'}
        height={'20vh'}
      >
        <Heading fontSize={60} color={OTHER_COLOR} fontFamily={'Canela'}>
          Answer
        </Heading>
      </Flex>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        height={'65vh'}
        paddingTop={'10vh'}
        paddingBottom={'10vh'}
      >
        <Box>
          {buttons.map((button) => {
            return (
              <Image
                className={'image'}
                key={button.name}
                src={answer === button.name ? button.hover : button.normal}
                alt={button.name}
                width={400}
                height={50}
                onClick={() => setInternalAnswer(button.name)}
              />
            );
          })}
        </Box>
      </Flex>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        height={'15vh'}
      >
        <Button
          fontFamily={'Avenir'}
          fontSize={40}
          height={'70%'}
          width={'62%'}
          rounded={18}
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
