import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSummaryPageQuery } from '../../../graphql';
import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';

function Summary() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [{ data, fetching, error }] = useSummaryPageQuery({
    variables: { sessionId: `${sessionId}` },
  });

  if (!data) return <p>There is no summary...</p>;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>;

  return (
    <Box
      background={BASE_COLOR}
      height={'100vh'}
      color={OTHER_COLOR}
      overflow={'hidden'}
    >
      <Flex direction={'column'} height={'100%'}>
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
          height={'100%'}
          borderColor={OTHER_COLOR}
        >
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            justifyContent={'space-around'}
            height={'100%'}
          >
            <Heading size={'2xl'} fontFamily={'Canela'}>
              結果発表！！！
            </Heading>
            {data.getResultSummariesByGuests.slice(0, 7).map((d) => {
              return (
                <>
                  <Text size={'l'} lineHeight={'160px'}>
                    第{d.rank}位{d.guestName}
                  </Text>
                  <Text>
                    正当数：{d.numberOfCollectAnswers}/{d.numberOfQuestions}
                  </Text>
                  <Text>所要時間：{(d.totalTime / 1000).toFixed(2)}秒</Text>
                </>
              );
            })}
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

export default Summary;
