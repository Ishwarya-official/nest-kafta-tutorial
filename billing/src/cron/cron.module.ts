import { Module } from '@nestjs/common';
import { HandlerModule } from 'src/data-handler/handler.module';
import { CronRunner } from './cron.runner';



@Module({
  imports: [HandlerModule],
  providers: [
      CronRunner,      
  ],
})
export class CronModule {}
