import { Inject, Injectable } from "@nestjs/common";
import { ExampleConsumer } from "src/consumer/example.consumer";
import { CronAbstract } from "../abstractions/cron.abstract";

@Injectable()
export class DataCron extends CronAbstract{

    constructor(
        @Inject('ExampleConsumer')
        private consumer: ExampleConsumer
    ){
        super()
    }
    async execute(): Promise<void>{
        await this.consumer.startBatchConsumer()
        return;
    }
    canRun(): Boolean{
        return true;
    }

    
}