import { Module } from '@nestjs/common';
import { DataCron } from './data-cron.handler';
import { ExampleConsumer } from 'src/consumer/example.consumer';



@Module({
  imports: [],
  providers: [DataCron, {
    provide: 'ExampleConsumer',
    useClass: ExampleConsumer,
  } ],
  exports: [DataCron]
})
export class HandlerModule {}
