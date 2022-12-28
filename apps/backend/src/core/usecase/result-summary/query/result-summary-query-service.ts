import { ResultSummaryByUserDto } from '../../../../api/result-summary/result-summary-by-user.dto';

export interface ResultSummaryQueryService {
  getResultSummaries(sessionId: string): Promise<ResultSummaryByUserDto[]>;
}
