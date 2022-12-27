import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { ResultSummaryResolver } from './result-summary.resolver';

@Module({
  imports: [CoreModule],
  providers: [ResultSummaryResolver],
  exports: [ResultSummaryResolver],
})
export class ResultSummaryModule {}
