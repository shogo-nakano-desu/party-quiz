import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GuestAnswerInputParams } from './guest-answer-input';
import { GuestAnswerUsecase } from '../../core/usecase/guest-answer/guest-answer.usecase';

@Resolver()
export class GuestAnswerResolver {
  constructor(private readonly usecase: GuestAnswerUsecase) {}

  @Mutation(() => Boolean)
  async createGuestAnswer(
    @Args({ name: 'input', type: () => GuestAnswerInputParams })
    input: GuestAnswerInputParams,
  ): Promise<boolean> {
    await this.usecase.insertGuestAnswer(input);
    return true;
  }
}
