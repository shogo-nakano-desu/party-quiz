import { useRouter } from 'next/router'
import { QuestionPageDocument } from '../../../../graphql';
import { useQuery, gql } from '@apollo/client';
import { useApollo } from '../../lib/apolloClient';
import { QUESTION_PAGE_QUERY } from './question';

const Question = () => {
  const router = useRouter()
  const { sessionId } = router.query
  const {data} = useQuery(QUESTION_PAGE_QUERY); 

  return (<>
  <p>Session: {sessionId}</p>
  <div>{data?.listQuestions.map((item)=>item.sessionDetailId)}</div>
  </>
  )
}

export default Question