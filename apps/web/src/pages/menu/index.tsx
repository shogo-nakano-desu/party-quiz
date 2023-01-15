import {
  Text,
  Box,
  Divider,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { menu } from './detail';

const TEXT_COLOR = 'blackAlpha.800';
const MENU_SIZE = 12;
const MENU_MARGIN_TOP = 6;

function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={'Lora'} fontSize={15}>
            {name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'ZenkakuGothicNew'} fontSize={15}>
            {menu.find((m) => m.name === name)?.detail}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box backgroundColor={'#F5CFCF'}>
        <Flex align={'center'} direction={'column'} color={TEXT_COLOR}>
          <Text
            fontFamily="Cinzel"
            fontSize="40px"
            color={TEXT_COLOR}
            marginTop={10}
          >
            DRINK MENU
          </Text>
          <Heading
            fontFamily={'Forum'}
            fontWeight={400}
            fontSize={'32px'}
            marginTop={5}
            marginBottom={-1}
            color={TEXT_COLOR}
          >
            WINE
          </Heading>
          <Divider
            borderEndRadius={'rotate(0.23deg)'}
            border={'0.5px solid black'}
            width={250}
          />
          <Text
            fontFamily={'Lora'}
            marginTop={MENU_MARGIN_TOP}
            color={TEXT_COLOR}
          >
            White
          </Text>
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ミューレ アルザス アッサンブラージュ');
                onOpen();
              }}
            >
              ミューレ アルザス アッサンブラージュ
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('レ ヴァン ヴィヴァン デラ空洞 2022');
                onOpen();
              }}
            >
              レ ヴァン ヴィヴァン デラ空洞 2022
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('デ バルトリ ソーレ エ ヴェント 2021');
                onOpen();
              }}
            >
              デ バルトリ ソーレ エ ヴェント 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ヒードラー グリューナーヴェルトリーナー レス 2021');
                onOpen();
              }}
            >
              ヒードラー グリューナーヴェルトリーナー レス 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'ジュリアン ペイラス ヴァン ド フランス レ コパン ダボール',
                );
                onOpen();
              }}
            >
              ジュリアン ペイラス ヴァン ド フランス <br />レ コパン ダボール
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('クリスティアーノ グッタローロ ジャ 2021');
                onOpen();
              }}
            >
              クリスティアーノ グッタローロ ジャ 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'イミッヒ バッテリーベルク エンキルヒャー シュテッフェンスベルク・リースリング',
                );
                onOpen();
              }}
            >
              イミッヒ バッテリーベルク エンキルヒャー <br />{' '}
              シュテッフェンスベルク・リースリング
            </Text>
          </Box>
          <Text
            fontFamily={'Lora'}
            marginTop={MENU_MARGIN_TOP}
            color={TEXT_COLOR}
          >
            Red
          </Text>
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('グレープリパブリック アランチョーネ 2021');
                onOpen();
              }}
            >
              グレープリパブリック アランチョーネ 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ダイヤモンド酒造 MBA Huit 結ひ 2018');
                onOpen();
              }}
            >
              ダイヤモンド酒造 MBA Huit 結ひ 2018
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'ル レザン エ ランジュ (アントナン アゾーニ) ルージュ ファーブル 2021',
                );
                onOpen();
              }}
            >
              ル レザン エ ランジュ (アントナン アゾーニ) <br />ル レザン エ
              ランジュ ルージュ ファーブル 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'ドメーヌ グラムノン コート デュ ローヌ ポワニェ ド レザン 2021',
                );
                onOpen();
              }}
            >
              ドメーヌ グラムノン コート デュ ローヌ <br />
              ポワニェ ド レザン 2021
            </Text>
          </Box>
          <Text
            fontFamily={'Lora'}
            marginTop={MENU_MARGIN_TOP}
            color={TEXT_COLOR}
          >
            Rose
          </Text>
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('イル ファルネート ジャンドン ロザート 2021');
                onOpen();
              }}
            >
              イル ファルネート ジャンドン ロザート 2021
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('マラウーヴァ ロザレッラ 2020');
                onOpen();
              }}
            >
              マラウーヴァ ロザレッラ 2020
            </Text>
          </Box>
          <Text
            fontFamily={'Lora'}
            marginTop={MENU_MARGIN_TOP}
            color={TEXT_COLOR}
          >
            Orange
          </Text>
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'ベルウッドヴィンヤード クラシック デラウエア ブランジュ 2022',
                );
                onOpen();
              }}
            >
              ベルウッドヴィンヤード クラシック <br />
              デラウエア ブランジュ 2022
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('イル ファルネート ジャンドン ビアンコ 2021');
                onOpen();
              }}
            >
              イル ファルネート ジャンドン ビアンコ 2021
            </Text>
          </Box>
          <Text
            fontFamily={'Lora'}
            marginTop={MENU_MARGIN_TOP}
            color={TEXT_COLOR}
          >
            Sparkling
          </Text>
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName(
                  'ファットリア アル フィオーレ エヴリシング イズ ア ギフト ビアンコ 2022',
                );
                onOpen();
              }}
            >
              ファットリア アル フィオーレ
              <br />
              エヴリシング イズ ア ギフト ビアンコ 2022
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('BKワインズ ペティアン ナチュレル Oishi 2022');
                onOpen();
              }}
            >
              BKワインズ ペティアン ナチュレル Oishi 2022
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('イエロー マジック ワイナリー ヒップホップ デラ 2022');
                onOpen();
              }}
            >
              イエロー マジック ワイナリー ヒップホップ デラ 2022
            </Text>
          </Box>
          <Heading
            fontFamily={'Forum'}
            fontWeight={400}
            fontSize={'32px'}
            marginTop={5}
            marginBottom={-1}
            color={TEXT_COLOR}
          >
            BEER
          </Heading>
          <Divider
            borderEndRadius={'rotate(0.23deg)'}
            border={'0.5px solid black'}
            width={250}
          />
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              onClick={() => {
                setName('イネディット');
                onOpen();
              }}
            >
              イネディット
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ブリュードッグ パンクIPA');
                onOpen();
              }}
            >
              ブリュードッグ パンクIPA
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ブリュードッグ ヘイジージェーン');
                onOpen();
              }}
            >
              ブリュードッグ ヘイジージェーン
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ブリュードッグ クロックワーク');
                onOpen();
              }}
            >
              ブリュードッグ クロックワーク
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ブリュードッグ エルビスジュース');
                onOpen();
              }}
            >
              ブリュードッグ エルビスジュース
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ブリュードッグ プラネットペールエール');
                onOpen();
              }}
            >
              ブリュードッグ プラネットペールエール
            </Text>
          </Box>
          <Heading
            fontFamily={'Forum'}
            fontWeight={400}
            fontSize={'32px'}
            marginTop={5}
            marginBottom={-1}
            color={TEXT_COLOR}
          >
            OTHER
          </Heading>
          <Divider
            borderEndRadius={'rotate(0.23deg)'}
            border={'0.5px solid black'}
            width={250}
          />
          <Box fontFamily={'ZenkakuGothicNew'} fontSize={MENU_SIZE}>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              onClick={() => {
                setName('ラポムレ ふじりんご＆洋梨ルレクチェジュース');
                onOpen();
              }}
            >
              ラポムレ ふじりんご＆洋梨ルレクチェジュース
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ラポムレ すりおろしりんごジュース');
                onOpen();
              }}
            >
              ラポムレ すりおろしりんごジュース
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('人参と林檎のジュース(赤) / 春庭農園');
                onOpen();
              }}
            >
              人参と林檎のジュース(赤) / 春庭農園
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('黄色い人参と林檎のジュース / 春庭農園');
                onOpen();
              }}
            >
              黄色い人参と林檎のジュース / 春庭農園
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('うんしゅうみかんジュース');
                onOpen();
              }}
            >
              うんしゅうみかんジュース
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ファルツァー トラウベンザフト 赤');
                onOpen();
              }}
            >
              ファルツァー トラウベンザフト 赤
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ファルツァー トラウベンザフト 白');
                onOpen();
              }}
            >
              ファルツァー トラウベンザフト 白
            </Text>
            <Text
              align={'center'}
              marginTop={MENU_MARGIN_TOP}
              marginBottom={10}
              color={TEXT_COLOR}
              onClick={() => {
                setName('ポール ジロー スパークリング グレープジュース 2022');
                onOpen();
              }}
            >
              ポール ジロー スパークリング グレープジュース 2022
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
export default Menu;
