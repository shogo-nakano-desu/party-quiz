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

  const winner = data.getResultSummariesByGuests.slice(0, 1)[0];

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
            height={'40%'}
          >
            <Heading fontSize={70} fontFamily={'Canela'}>
              Ranking
            </Heading>
            <Box>
              <Heading fontSize={55} textAlign={'center'}>
                👑第{winner.rank}位👑
                <br />
                {winner.guestName}
              </Heading>
              <Heading fontSize={45} textAlign={'center'}>
                正当数：{winner.numberOfCollectAnswers}/
                {winner.numberOfQuestions}
              </Heading>
              <Heading fontSize={45} textAlign={'center'}>
                所要時間：{(winner.totalTime / 1000).toFixed(2)}秒
              </Heading>
            </Box>
          </Flex>
          <Flex
            wrap={'wrap'}
            direction={'row'}
            width={'100%'}
            textAlign={'center'}
            // margin={5}
          >
            {data.getResultSummariesByGuests.slice(1, 5).map((d) => {
              return (
                <>
                  <Box width={'50%'} marginTop={20} textAlign={'center'}>
                    <Heading fontSize={d.rank === 2 || d.rank === 3 ? 45 : 35}>
                      {d.rank === 2 || d.rank === 3 ? '🎉' : ''}第{d.rank}位
                      {d.rank === 2 || d.rank === 3 ? '🎉' : ''}
                      <br />
                      {d.guestName}
                    </Heading>
                    <Heading
                      fontSize={d.rank === 2 || d.rank === 3 ? 35 : 25}
                      textAlign={'center'}
                    >
                      正当数：{d.numberOfCollectAnswers}/{d.numberOfQuestions}
                    </Heading>
                    <Heading
                      fontSize={d.rank === 2 || d.rank === 3 ? 35 : 25}
                      textAlign={'center'}
                    >
                      所要時間：{(d.totalTime / 1000).toFixed(2)}秒
                    </Heading>
                  </Box>
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
