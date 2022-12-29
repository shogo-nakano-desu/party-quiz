import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QuestionDto } from './question.dto';
import { QUESTION_QUERY_SERVICE } from '../../core/constants';
import { QuestionQueryService } from '../../core/usecase/question/query/question-query-service';

@Resolver()
export class QuestionResolver {
  constructor(
    @Inject(QUESTION_QUERY_SERVICE)
    private readonly queryService: QuestionQueryService,
  ) {}

  @Query(() => [QuestionDto])
  async listQuestions(
    @Args({ name: 'sessionId', type: () => String })
    sessionId: string,
  ): Promise<QuestionDto[]> {
    console.log(sessionId);
    return await this.queryService.listQuestions(sessionId);
  }
}
