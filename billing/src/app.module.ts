import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './cron/cron.module';
import { HandlerModule } from './data-handler/handler.module';
import { ExampleConsumer } from './consumer/example.consumer';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    CronModule,
    HandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
