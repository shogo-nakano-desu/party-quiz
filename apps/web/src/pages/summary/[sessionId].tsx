import { Button, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from "@chakra-ui/react";
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
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {data.getResultSummariesByGuests.map(d=>{
                return (
                        <Card key={d.guestId}>
                            <CardHeader>
                                <Heading size='md'>{d.guestName}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>正当数 : {d.numberOfCollectAnswers}/{d.numberOfQuestions}</Text>
                                <Text>かかった時間 : {d.totalTime/1000}秒</Text>
                            </CardBody>
                        </Card>
                    )
            })
                
            }
        </SimpleGrid>
        </>
    )
}
export default Summary;