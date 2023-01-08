import { Resolver, Args, Query, ID } from '@nestjs/graphql';
import { ResultSummaryByGuestDto } from './result-summary-by-guest.dto';
import { ResultSummaryQueryService } from '../../core/usecase/result-summary/query/result-summary-query-service';
import { Inject } from '@nestjs/common';
import { RESULT_SUMMARY_QUERY_SERVICE } from '../../core/constants';

@Resolver()
export class ResultSummaryResolver {
  constructor(
    @Inject(RESULT_SUMMARY_QUERY_SERVICE)
    private readonly queryService: ResultSummaryQueryService,
  ) {}

  @Query(() => [ResultSummaryByGuestDto])
  async getResultSummariesByGuests(
    @Args({ name: 'sessionId', type: () => ID })
    sessionId: string,
  ): Promise<ResultSummaryByGuestDto[]> {
    return await this.queryService.getResultSummaries(sessionId);
  }
}
