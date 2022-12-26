import { UserAnswer } from './user-answer';

export interface UserAnswerRepository {
  save(userAnswer: UserAnswer): void;
}
