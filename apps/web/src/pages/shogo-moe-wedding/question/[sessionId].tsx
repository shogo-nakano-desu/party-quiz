import { useRouter } from 'next/router'
import { useQuestionPageQuery } from '../../../../graphql';

const Question = () => {
  const router = useRouter()
  const { sessionId } = router.query
  const [result] = useQuestionPageQuery({variables:{sessionId: `${sessionId}`}})
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>

  return (<>
  <p>Session: {sessionId}</p>
  <div>{data?.listQuestions.map((item)=>item.sessionDetailId)}</div>
  </>
  )
}

export default Question