import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataCron } from '../data-handler/data-cron.handler';

@Injectable()
export class CronRunner {
  constructor(
    @Inject(DataCron)
    private dataCron: DataCron
  ) {}

 

  @Cron(CronExpression.EVERY_10_SECONDS) //EVERY_10_MINUTES
  async getDatafromKafka() {
    this.dataCron.run();
  }
}
