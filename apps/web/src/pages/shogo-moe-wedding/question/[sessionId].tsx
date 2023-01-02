import { useRouter } from 'next/router'
import { QuestionPageDocument } from '../../../../graphql';
import { QUESTION_PAGE_QUERY } from './question';
import { graphql } from 'graphql';

// const listQuestionsDoc = graphql(
//   query QuestionPage
// )

const Question = () => {
  const router = useRouter()
  const { sessionId } = router.query


  return (<>
  <p>Session: {sessionId}</p>
  {/* <div>{data?.listQuestions.map((item)=>item.sessionDetailId)}</div> */}
  </>
  )
}

export default Question