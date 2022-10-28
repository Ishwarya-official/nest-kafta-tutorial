import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postData(data): void{
    console.log("received data through kafka")
    console.log(data)
  }
}
