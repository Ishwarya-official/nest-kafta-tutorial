import { ExampleConsumer } from './consumer/example.consumer';
import { Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController{
  constructor(
    private readonly appService: AppService,
    private readonly consumer: ExampleConsumer
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @EventPattern('post_data')
  // postData(data: any){
  //   return this.appService.postData(data);
  // }

  @Post()
  async getData(){
    await this.consumer.startBatchConsumer()
  }
}
