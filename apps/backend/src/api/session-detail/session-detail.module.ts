import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { SessionDetailResolver } from './session-detail.resolver';

@Module({
  imports: [CoreModule],
  providers: [SessionDetailResolver],
  exports: [SessionDetailResolver],
})
export class SessionDetailModule {}
