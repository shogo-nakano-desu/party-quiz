import { useState } from 'react';
import {
  Button,
  Heading,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';

const pageNumbers = [1, 2, 3, 4] as const;
type PageNumber = (typeof pageNumbers)[number];

function isPageNumber(num: number): num is PageNumber {
  for (const i of pageNumbers) {
    if (i === num) return true;
  }
  return false;
}

export function Introduction() {
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

  switch (page) {
    case 1:
      return (
        <>
          <Heading size={'4xl'}>〜〜〜ミニクイズ大会〜〜〜</Heading>
          <Heading size={'2xl'}>ちょっとした景品つき</Heading>
          <Button onClick={() => nextPage()}>Next</Button>
        </>
      );
    case 2:
      return (
        <>
          <Heading size={'4xl'}>ルール説明〜出題方法〜</Heading>
          <Heading size={'2xl'}>全部で８問あります</Heading>
          <Heading size={'2xl'}>30秒毎に問題が切り替わります</Heading>
          <Heading size={'2xl'}>
            前の問題に戻ることはなく、最後まで進み続けます
          </Heading>
          <Flex direction={'row'}>
            <Button onClick={() => backPage()}>Back</Button>
            <Button onClick={() => nextPage()}>Next</Button>
          </Flex>
        </>
      );
    case 3:
      return (
        <>
          <Heading size={'4xl'}>ルール説明〜解答方法〜</Heading>
          <Heading size={'2xl'}>
            問題が表示されている間だけ、スマホから回答可能です
          </Heading>
          <Heading size={'2xl'}>
            問題が表示されている間であれば、何度でも回答可能です
          </Heading>
          <Heading size={'2xl'}>
            前の問題に戻って回答することはできません
          </Heading>
          <Flex direction={'row'}>
            <Button onClick={() => backPage()}>Back</Button>
            <Button onClick={() => nextPage()}>Next</Button>
          </Flex>
        </>
      );
    case 4:
      return (
        <>
          <Heading size={'4xl'}>ルール説明〜順位決定方法〜</Heading>
          <Heading size={'2xl'}>1. 正当数</Heading>
          <Heading size={'2xl'}>2. 回答速度</Heading>
          <Flex direction={'row'}>
            <Button onClick={() => backPage()}>Back</Button>
            <Button>
              <Link href={'/question/sesn-11'}>Start</Link>
            </Button>
          </Flex>
        </>
      );
  }
}
