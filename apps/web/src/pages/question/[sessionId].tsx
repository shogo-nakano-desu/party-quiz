import { useRouter } from 'next/router';
import {
  QuestionDto,
  useQuestionPageQuery,
  useStartSessionDetailMutation,
} from '../../../graphql';
import { useState } from 'react';
import { useEffect } from 'react';
import { addMilliseconds, addSeconds } from 'date-fns';

function Question() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [{ data, fetching, error }] = useQuestionPageQuery({
    variables: { sessionId: `${sessionId}` },
  });
  const [question, setQuestion] = useState<QuestionDto>();
  const [_, startSessionDetail] = useStartSessionDetailMutation();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (data) {
      // sort ascending order by number
      const questions = data.listQuestions.sort((a, b) => a.number - b.number);
      if (questions.length > 0)
        questions.push({ ...questions[0], name: 'end' });
      const now = new Date();
      questions.forEach((q, i) => {
        setTimeout(() => {
          const start = addMilliseconds(addSeconds(now, i * 30), i * 1);
          setQuestion(q);
          startSessionDetail({
            input: {
              sessionDetailId: q.sessionDetailId,
              startedAt: start!.toISOString(),
            },
          });
        }, 30001 * i);
      });
    }
  }, [fetching]);

  if (!data) return <p>There is no question...</p>;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... ${error.message}</p>;
  if (!question) return <p>No question</p>;
  if (question.name === 'end') return <p>End</p>;

  return (
    <>
      <h1>{question.name}</h1>
      <h3>{question.option_1}</h3>
      <h3>{question.option_2}</h3>
      <h3>{question.option_3}</h3>
      <h3>{question.option_4}</h3>
    </>
  );
}

export default Question;
