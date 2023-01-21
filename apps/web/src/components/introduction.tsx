import { Button, Heading, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { PageNumber } from '../pages/quiz-introduction';

export function Introduction(props: { pageNumber: PageNumber }) {
  switch (props.pageNumber) {
    case 1:
      return (
        <>
          <Heading size={'4xl'} fontFamily={'Canela'}>
            Quiz Time
          </Heading>
        </>
      );
    case 2:
      return (
        <>
          <Heading size={'4xl'} fontFamily={'Canela'}>
            Rules
          </Heading>
          <Heading size={'2xl'}>◆全部で８問あります。</Heading>
          <Heading size={'2xl'}>◆30秒毎に問題が切り替わります。</Heading>
          <Heading size={'2xl'}>
            ◆前の問題に戻ることはなく、最後まで進み続けます。
          </Heading>
        </>
      );
    case 3:
      return (
        <>
          <Heading size={'4xl'} fontFamily={'Canela'}>
            Rules
          </Heading>
          <Heading size={'2xl'}>
            ◆問題が表示されている間だけ、スマホから回答可能です
          </Heading>
          <Heading size={'2xl'}>
            ◆問題が表示されている間であれば、何度でも回答可能です
          </Heading>
          <Heading size={'2xl'}>
            ◆前の問題に戻って回答することはできません
          </Heading>
        </>
      );
    case 4:
      return (
        <>
          <Heading size={'4xl'} fontFamily={'Canela'}>
            Rules
          </Heading>
          <Heading size={'2xl'}>1. 正当数</Heading>
          <Heading size={'2xl'}>2. 回答速度</Heading>
          <Flex direction={'row'}>
            <Button>
              <Link href={'/question/sesn-11'}>Start</Link>
            </Button>
          </Flex>
        </>
      );
    default:
      return <></>;
  }
}
