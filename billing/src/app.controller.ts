import { Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController{
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @EventPattern('post_data')
  // postData(data: any){
  //   return this.appService.postData(data);
  // }

  // @Post()
  // async getData(){
  //   this.consumer.startBatchConsumer()
  // }
}
