import { Module } from '@nestjs/common';
import { GuestAnswerResolver } from './guest-answer.resolver';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [GuestAnswerResolver],
  exports: [GuestAnswerResolver],
})
export class GuestAnswerModule {}
