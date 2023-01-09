import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { SampleResolver } from './sample.resolver';

@Module({
  imports: [CoreModule],
  providers: [SampleResolver],
  exports: [SampleResolver],
})
export class SampleModule {}
