import { Resolver, Args, Query } from '@nestjs/graphql';
import { SessionDetailUsecase } from '../../core/usecase/session-detail/session-detail.usecase';
import { ResultSummaryByUserDto } from './result-summary-by-user.dto';

@Resolver()
export class ResultSummaryResolver {
  constructor(private readonly usecase: SessionDetailUsecase) {}

  @Query(() => [ResultSummaryByUserDto])
  async getResultSummariesByUsers(
    @Args({ name: 'sessionId', type: () => String })
    sessionId: string,
  ): Promise<ResultSummaryByUserDto[]> {
    console.log(sessionId);
    return [];
  }
}
