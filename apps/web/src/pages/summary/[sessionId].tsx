import { Button, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSummaryPageQuery } from "../../../graphql";

function Summary(){
    const router = useRouter();
    const {sessionId} = router.query;
    const [{data, fetching, error}] = useSummaryPageQuery({
        variables: {sessionId: `${sessionId}`},
    });
    
    if(!data)return <p>There is no summary...</p>;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... ${error.message}</p>;
    
    return (
        <>
        <Heading>
            結果発表！
        </Heading>
        <Flex direction={'row'} wrap={'wrap'} justify={'space-around'} alignItems={'center'} height={'80vh'}>
            {/* 条件分岐で１−３位は色が変わるようにする */}
            {data.getResultSummariesByGuests.slice(0,15).map((d,i)=>{
                return (
                        <Card key={d.guestId} width={'18%'}>
                            <CardHeader>
                                <Heading size='md'>{d.guestName}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>正当数 : {d.numberOfCollectAnswers}/{d.numberOfQuestions}</Text>
                                <Text>かかった時間 : {(d.totalTime/1000).toFixed(2)}秒</Text>
                            </CardBody>
                        </Card>
                    )
            })
                
            }
        </Flex>
        </>
    )
}
export default Summary;