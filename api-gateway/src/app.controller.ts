import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';


class Postdata{
  name: string;
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postData(): void{
    return this.appService.postData()
  }
}
