import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserAnswerInputParams } from './user-answer-input';
import { UserAnswerUsecase } from '../../core/usecase/user-answer/user-answer.usecase';

@Resolver()
export class UserAnswerResolver {
  constructor(private readonly usecase: UserAnswerUsecase) {}

  @Mutation(() => Boolean)
  async createUserAnswer(
    @Args({ name: 'input', type: () => UserAnswerInputParams })
    input: UserAnswerInputParams,
  ): Promise<boolean> {
    await this.usecase.insertUserAnswer(input);
    return true;
  }
}
