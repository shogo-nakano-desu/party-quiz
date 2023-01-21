import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Introduction } from '../../components/introduction';

import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';
const pageNumbers = [1, 2, 3, 4] as const;
export type PageNumber = (typeof pageNumbers)[number];
function QuizIntroduction() {
  function isPageNumber(num: number): num is PageNumber {
    for (const i of pageNumbers) {
      if (i === num) return true;
    }
    return false;
  }
  const [page, setPage] = useState<PageNumber>(1);

  const nextPage = () => {
    const nextPage = page + 1;
    if (isPageNumber(nextPage)) {
      setPage(nextPage);
    }
  };
  const backPage = () => {
    const backPage = page - 1;
    if (isPageNumber(backPage)) {
      setPage(backPage);
    }
  };
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
          onClick={() => backPage()}
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
            <Introduction pageNumber={page} />
          </Flex>
        </Box>
        <Box
          backgroundColor={OTHER_COLOR}
          width={10}
          height={10}
          position={'absolute'}
          bottom={0}
          right={0}
          onClick={() => nextPage()}
        ></Box>
      </Flex>
    </Box>
  );
}
export default QuizIntroduction;
