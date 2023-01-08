import { GuestAnswer } from './guest-answer';

export interface GuestAnswerRepository {
  save(guestAnswer: GuestAnswer): void;
}
