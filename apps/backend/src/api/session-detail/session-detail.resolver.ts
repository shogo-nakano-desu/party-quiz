import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StartSessionDetailInputParams } from './start-session-detail-input';
import { SessionDetailUsecase } from '../../core/usecase/session-detail/session-detail.usecase';
import { InternalServerErrorException } from '@nestjs/common';
import { EndSessionDetailInputParams } from './end-session-detail-input';

@Resolver()
export class SessionDetailResolver {
  constructor(private readonly usecase: SessionDetailUsecase) {}

  @Mutation(() => Boolean)
  async startSessionDetail(
    @Args({ name: 'input', type: () => StartSessionDetailInputParams })
    input: StartSessionDetailInputParams,
  ): Promise<boolean> {
    try {
      console.log(
        `startSessionDetail 
        sessionDetailId: ${input.sessionDetailId}
        startedAt: ${input.startedAt}`,
      );
      await this.usecase.start(input);
    } catch (e) {
      new InternalServerErrorException(e);
    }
    return true;
  }

  @Mutation(() => Boolean)
  async endSessionDetail(
    @Args({ name: 'input', type: () => EndSessionDetailInputParams })
    input: EndSessionDetailInputParams,
  ): Promise<boolean> {
    try {
      console.log(`endSessionDetail
      sessionDetailId: ${input.sessionDetailId}
      endedAt: ${input.endedAt}`);
      await this.usecase.end(input);
    } catch (e) {
      new InternalServerErrorException(e);
    }
    return true;
  }
}
