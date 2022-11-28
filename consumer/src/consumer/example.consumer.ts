
import { Injectable } from '@nestjs/common'
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload, Batch, Admin, KafkaMessage, } from 'kafkajs'

@Injectable()
export class ExampleConsumer {
  private kafkaConsumer: Consumer
  private kafkaAdmin: Admin;

  // public constructor(messageProcessor: any) {
    constructor() {
      this.kafkaConsumer = this.createKafkaConsumer()
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({ 
      clientId: 'automation-server',
      brokers: ['localhost:9092']
    })
    this.kafkaAdmin = kafka.admin();
    const consumer = kafka.consumer({ groupId: 'automation-consumer' })
    return consumer
  }
  

  public async startBatchConsumer(): Promise<void> {
    console.log("\n\n\n\n\nstarting Batch Consumer")
    const topic: ConsumerSubscribeTopics = {
      topics: ['queue.order'],
      fromBeginning: true
    }

    await this.kafkaConsumer.connect()
    await this.kafkaConsumer.subscribe(topic)
   
    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topic);

      await this.kafkaConsumer.run({
        autoCommit: false,

        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          console.log('\n\nfetching data');
          const { batch } = eachBatchPayload;
          const latestOffsetStoredInKafka = (
            await this.kafkaAdmin.fetchTopicOffsets("queue.order")
          )[0].offset;

          await Promise.all(
            batch.messages.map(async (message: KafkaMessage) => {
              const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
              console.log(`- ${prefix} ${message.key}#${message.value}`);
              
            }),
          );

          await this.kafkaConsumer.commitOffsets([
            {
              topic: "queue.order",
              partition: batch.partition,
              offset: latestOffsetStoredInKafka,
            },
          ]);
          console.log('offset setting done   ', latestOffsetStoredInKafka);

          this.pauseFetchingData();
          this.resumeFetchingData();
        },
      });
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  private pauseFetchingData(): Promise<void> {
    console.log("\n\n\nPAUSING CONSUMER")
    this.kafkaConsumer.pause([{topic: "queue.order"}])
    return
  }

  private resumeFetchingData(): Promise<void> {
    setTimeout(() => {
      console.log('\n\n\nRESUMING CONSUMER');
      this.kafkaConsumer.resume([
        {
          topic: "queue.order",
        },
      ]);
    }, 10000);

    return;
  }

  //TODO: setting offset from code
  
}