import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  ListItem,
  UnorderedList,
  OrderedList,
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
function QuizIntroduction() {
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
          <Heading>〜〜〜ミニクイズ大会〜〜〜</Heading>
          <Text>ちょっとした景品つき</Text>
          <Button onClick={() => nextPage()}>Next</Button>
        </>
      );
    case 2:
      return (
        <>
          <Heading>ルール説明〜出題方法〜</Heading>
          <UnorderedList>
            <ListItem>全部で８問あります</ListItem>
            <ListItem>30秒毎に問題が切り替わります</ListItem>
            <ListItem>前の問題に戻ることはなく、最後まで進み続けます</ListItem>
          </UnorderedList>
          <Button onClick={() => backPage()}>Back</Button>
          <Button onClick={() => nextPage()}>Next</Button>
        </>
      );
    case 3:
      return (
        <>
          <Heading>ルール説明〜解答方法〜</Heading>
          <UnorderedList>
            <ListItem>
              問題が表示されている間だけ、スマホから回答可能です
            </ListItem>
            <ListItem>
              例えば、１つ目の問題が表示されている間に行った回答は１つ目の問題の回答に、２つ目の問題が表示されている間に行った回答は２つ目の問題の回答になります。
            </ListItem>
            <ListItem>
              問題が表示されている間であれば、何度でも回答可能です
            </ListItem>
            <ListItem>
              同じ問題の中で、最後に行った回答があなたの回答になります
            </ListItem>
            <ListItem>前の問題に戻って回答することはできません</ListItem>
          </UnorderedList>
          <Button onClick={() => backPage()}>Back</Button>
          <Button onClick={() => nextPage()}>Next</Button>
        </>
      );
    case 4:
      return (
        <>
          <Heading>ルール説明〜順位決定方法〜</Heading>
          <OrderedList>
            <ListItem>正当数</ListItem>
            <ListItem>回答速度</ListItem>
          </OrderedList>
          <Heading size={'md'}>
            例 :
            Aさんは7/8正解(合計所要時間90秒)、Bさんは7/8正解(合計所要時間60秒)、Cさんは5/8正解(合計所要時間3030秒)の場合
          </Heading>
          <OrderedList>
            <ListItem>Bさん</ListItem>
            <ListItem>Aさん</ListItem>
            <ListItem>Cさん</ListItem>
          </OrderedList>
          <Button onClick={() => backPage()}>Back</Button>
          <Link href={'/question/sesn-1'}>問題開始</Link>
        </>
      );
  }
}
export default QuizIntroduction;
