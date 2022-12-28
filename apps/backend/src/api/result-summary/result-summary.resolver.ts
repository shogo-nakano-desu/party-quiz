import { Resolver, Args, Query } from '@nestjs/graphql';
import { ResultSummaryByUserDto } from './result-summary-by-user.dto';
import { ResultSummaryQueryService } from '../../core/usecase/result-summary/query/result-summary-query-service';
import { Inject } from '@nestjs/common';
import { RESULT_SUMMARY_QUERY_SERVICE } from '../../core/constants';

@Resolver()
export class ResultSummaryResolver {
  // usecase層にqueryServiceというrepository的なものを作成して、それをimplementsしたqueryDatasourceを作る。
  // usecase層は使わず、resolver -> queryServiceで直接クエリする。
  // 計算処理などはdomain層に負わせる。domain層に渡すためのゴタゴタはqueryServiceの中でやるか、domain層にaggregateを作って、domainを全部ごちゃっと渡して計算させる。
  constructor(
    @Inject(RESULT_SUMMARY_QUERY_SERVICE)
    private readonly queryService: ResultSummaryQueryService,
  ) {}

  @Query(() => [ResultSummaryByUserDto])
  async getResultSummariesByUsers(
    @Args({ name: 'sessionId', type: () => String })
    sessionId: string,
  ): Promise<ResultSummaryByUserDto[]> {
    return await this.queryService.getResultSummaries(sessionId);
  }
}
