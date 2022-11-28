import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleConsumer } from './consumer/example.consumer';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ExampleConsumer],
})
export class AppModule {}
