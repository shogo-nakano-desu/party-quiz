import { ResultSummaryByGuestDto } from '../../../../api/result-summary/result-summary-by-guest.dto';

export interface ResultSummaryQueryService {
  getResultSummaries(sessionId: string): Promise<ResultSummaryByGuestDto[]>;
}
