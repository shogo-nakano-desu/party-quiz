import { Module } from '@nestjs/common';
import { UserAnswerResolver } from './user-answer.resolver';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [UserAnswerResolver],
  exports: [UserAnswerResolver],
})
export class UserAnswerModule {}
