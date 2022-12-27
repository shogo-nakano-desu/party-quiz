import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StartSessionDetailInputParams } from './start-session-detail-input';
import { SessionDetailUsecase } from '../../core/usecase/session-detail/session-detail.usecase';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver()
export class SessionDetailResolver {
  constructor(private readonly usecase: SessionDetailUsecase) {}
  @Mutation(() => Boolean)
  async startSessionDetail(
    @Args({ name: 'input', type: () => StartSessionDetailInputParams })
    input: StartSessionDetailInputParams,
  ): Promise<boolean> {
    try {
      await this.usecase.start(input);
    } catch (e) {
      new InternalServerErrorException(e);
    }
    return true;
  }
}
