import { useRouter } from 'next/router';
import { useCreateAnswerMutation } from '../../../graphql';
import { useEffect, useState } from 'react';

type Answer = 'option_1' | 'option_2' | 'option_3' | 'option_4';
function Answer() {
  const router = useRouter();
  const { guestId } = router.query;
  const [_, createAnswer] = useCreateAnswerMutation();
  // TODO set session id
  const sessionId = 'sesn-1';
  const [answer, setAnswer] = useState<Answer>();
  

  return (
    <>
      <button onClick={() => setAnswer('option_1')}>answer 1</button>
      <button onClick={() => setAnswer('option_2')}>answer 2</button>
      <button onClick={() => setAnswer('option_3')}>answer 3</button>
      <button onClick={() => setAnswer('option_4')}>answer 4</button>
      
      <button
        onClick={() => {
          if (answer) {
            if (!isString(guestId)) {
              throw new Error(`guestId should be a string. current guestId: ${guestId}`);
            }
            createAnswer({
              input: {
                answer: answer,
                guestId,
                requestedAt: new Date().toISOString(),
                sessionId,
              },
            });
          }
        }}
      >
        submit
      </button>
    </>
  );
}
export default Answer;

function isString(str: any): str is string {
  return typeof str === 'string';
}
