import {
  Box,
  background,
  color,
  Flex,
  position,
  border,
  Heading,
  Link,
  Grid,
} from '@chakra-ui/react';
import { Introduction } from '../../components/introduction';

import { BASE_COLOR, OTHER_COLOR } from '../../utils/constants';

function QuizIntroduction() {
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
            <Introduction />
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
export default QuizIntroduction;
