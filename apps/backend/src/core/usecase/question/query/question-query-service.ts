import { QuestionDto } from '../../../../api/question/question.dto';

export interface QuestionQueryService {
  listQuestions(sessionId: string): Promise<QuestionDto[]>;
}
