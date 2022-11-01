
import { Injectable } from '@nestjs/common'
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload, } from 'kafkajs'

@Injectable()
export class ExampleConsumer {
  private kafkaConsumer: Consumer
  private messageProcessor: any

  // public constructor(messageProcessor: any) {
    constructor() {
    this.kafkaConsumer = this.createKafkaConsumer()
    console.log("Created Consumer")
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({ 
      clientId: 'billing-client',
      brokers: ['localhost:9092']
    })
    const consumer = kafka.consumer({ groupId: 'billing-consumer' })
    return consumer
  }


  public async startBatchConsumer(): Promise<void> {
    console.log("starting Batch Consumer")
    const topic: ConsumerSubscribeTopics = {
      topics: ['post_data'],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)
      await this.kafkaConsumer.run({
        // autoCommit: false,     
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload;

          console.log(batch.messages)
          for (const message of batch.messages) {
            // const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
            // console.log(`- ${prefix} ${message.key}#${message.value}`+"                 ",i) 
            // process messages
          }
        }
      })

      await this.shutdown()
          console.log("Shutting down consumer")

    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  //TODO: setting offset from code
  //get in batches
  //cron
  
}