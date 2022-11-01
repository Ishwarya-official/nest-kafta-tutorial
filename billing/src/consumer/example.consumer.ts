
import { Injectable } from '@nestjs/common'
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload, Batch, } from 'kafkajs'

@Injectable()
export class ExampleConsumer {
  private kafkaConsumer: Consumer

  // public constructor(messageProcessor: any) {
    constructor() {
      this.kafkaConsumer = this.createKafkaConsumer()
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
    console.log("\n\n\n\n\nstarting Batch Consumer")
    const topic: ConsumerSubscribeTopics = {
      topics: ['post_data'],
      fromBeginning: true
    }

    await this.kafkaConsumer.connect()
    await this.kafkaConsumer.subscribe(topic)
   
    try {
      await this.kafkaConsumer.run({
          autoCommit: false,

          eachBatch: async (eachBatchPayload: EachBatchPayload) => {
            console.log("running ")
            const { batch } = eachBatchPayload;
            
        

            // console.log(batch.messages)
            for (const message of batch.messages) {
              const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
              console.log(`- ${prefix} ${message.key}#${message.value}`) 
          
              // commiting offsets manually
              await this.kafkaConsumer.commitOffsets([
                { topic: 'post_data', partition: batch.partition, offset: message.offset }
              ])
              console.log("offset setting done   ", message.offset)

            }

            this.pauseFetchingData()

            setTimeout(() => {
              this.resumeFetchingData()
            }, 10000 )
          }
      })
     

    } catch (error) {
      console.log('Error: ', error)
    }
  }

  private pauseFetchingData(): Promise<void> {
    console.log("\n\n\nPAUSING CONSUMER")
    this.kafkaConsumer.pause([{topic: "post_data"}])
    return
  }

  private resumeFetchingData(): Promise<void> {
    console.log("\n\n\nRESUMING CONSUMER")
    this.kafkaConsumer.resume([{topic: "post_data"}])
    return
  }

  //TODO: setting offset from code
  
}