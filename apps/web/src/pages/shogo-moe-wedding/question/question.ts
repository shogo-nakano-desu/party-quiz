import { gql } from "@apollo/client"

const fragment = gql `fragment QuestionPage_questions on QuestionDto {
  sessionDetailId
  questionId
  number
  name
  option_1
  option_2
  option_3
  option_4
  answer
}`

export const QUESTION_PAGE_QUERY = gql`query QuestionPage($sessionId: ID!) {
  listQuestions(sessionId: $sessionId) {
    ...QuestionPage_questions
  }
}
`