import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

class PostData{
  name: string;
  age: number;
}

export class AppService {
  private i = 1
  constructor(
    @Inject('BILLING SERVICE')
    private readonly billingService: ClientKafka
  ){
  }
  getHello(): string {
    return 'Hello World!';
  }

  postData(): void {
    let data = {
      "name": this.i
    }
    this.i++;
    console.log("sending data to kafka  ", data)
    this.billingService.emit('post_data', data)
    return
  }
}