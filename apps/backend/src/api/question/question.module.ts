import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { QuestionResolver } from './question.resolver';

@Module({
  imports: [CoreModule],
  providers: [QuestionResolver],
  exports: [QuestionResolver],
})
export class QuestionModule {}
