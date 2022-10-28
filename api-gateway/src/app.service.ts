import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

class PostData{
  name: string;
  age: number;
}

export class AppService {
  constructor(
    @Inject('BILLING SERVICE')
    private readonly billingService: ClientKafka
  ){
  }
  getHello(): string {
    return 'Hello World!';
  }

  postData(data: PostData): void {
    console.log("sending data to kafka  ", data)

    this.billingService.emit('post_data', data)
    return
  }
}