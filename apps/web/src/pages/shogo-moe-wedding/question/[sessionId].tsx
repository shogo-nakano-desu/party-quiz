import { useRouter } from 'next/router'
import { QuestionDto, useQuestionPageQuery } from '../../../../graphql';
import { useState } from 'react';
import { Question } from '../../../components/Question';
import { useEffect } from 'react';

function Session() {
  const router = useRouter()
  const { sessionId } = router.query
  const [{ data, fetching, error }, fetch] = useQuestionPageQuery({variables:{sessionId: `${sessionId}`}})

  const [startedAt, setStartedAt] = useState<Date>();
  const [question, setQuestion] = useState<QuestionDto>();

  useEffect(()=>{
    if (data && !fetching && !error){
      // sort ascending order by number
      const questions = data.listQuestions.sort((a,b) => b.number - a.number);
      questions.forEach((question, i) => {
      setTimeout(()=> {
        setQuestion(question);
        setStartedAt(new Date());
      }, 3000*i)
  })
    }
  }, [data, error, fetching]);
  if (!data) return <p>There is no question...</p>
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>

  return (
    <>
      {question && startedAt ? 
        <Question 
          sessionDetailId={question.sessionDetailId}
          questionName={question.name}
          option1={question.option_1}
          option2={question.option_2}
          option3={question.option_3}
          option4={question.option_4}
          startedAt={startedAt}
          fetch={fetch}
        />
        :<></>
      }
    </>
  )
}

export default Session