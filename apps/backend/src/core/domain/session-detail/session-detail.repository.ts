import { SessionDetail } from './session-detail';

export interface SessionDetailRepository {
  getById(id: string): Promise<SessionDetail>;
  update(params: SessionDetail): Promise<void>;
}
