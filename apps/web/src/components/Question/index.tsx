import { addSeconds } from "date-fns";
import { useEndSessionDetailMutation, useStartSessionDetailMutation } from "../../../graphql";
import { useCallback, useEffect } from "react";
export type QuestionProps = {
    sessionDetailId:string;
    questionName: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    startedAt: Date;
    fetch: ()=>void;
}
export function Question({sessionDetailId, questionName , option1, option2, option3, option4, startedAt, fetch}:QuestionProps){
    const endedAt = addSeconds(startedAt, 30);
    const [startRes, startSessionDetail] = useStartSessionDetailMutation();
    const [endRes, endSessionDetail] = useEndSessionDetailMutation();
    const startFetching = startRes.fetching;
    const endFetching = endRes.fetching;

    const A = useCallback(()=> {
        startSessionDetail({input: {sessionDetailId, startedAt: "2022-10-10 12:00:00"}});
        endSessionDetail({input: {sessionDetailId, endedAt: "2022-10-10 12:00:00"}});
        fetch();
    }, [endSessionDetail, fetch, sessionDetailId, startSessionDetail]);
    
    return (
        <>
            <h1>{questionName}</h1>
            <h3>{option1}</h3>
            <h3>{option2}</h3>
            <h3>{option3}</h3>
            <h3>{option4}</h3>
        </>
    )
}