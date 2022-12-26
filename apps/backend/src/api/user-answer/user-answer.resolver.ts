import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserAnswerInputParams } from './user-answer-input';
import { UserAnswerDto } from './user-answer.dto';
import { UserAnswerUsecase } from '../../core/usecase/user-answer/user-answer.usecase';

@Resolver(() => UserAnswerDto)
export class UserAnswerResolver {
  constructor(private readonly usecase: UserAnswerUsecase) {}
  // This is mock resolver to test work
  @Query(() => [UserAnswerDto])
  async getUserAnswers(): Promise<readonly UserAnswerDto[]> {
    console.log('DEBUG');
    return [];
  }

  // TODO FIXME
  @Mutation(() => Boolean)
  async createUserAnswer(
    @Args({ name: 'input', type: () => UserAnswerInputParams })
    input: UserAnswerInputParams,
  ): Promise<boolean> {
    console.log(input.requestedAt);
    console.log(typeof input.requestedAt);
    await this.usecase.insertUserAnswer(input);
    return true;
  }
}
