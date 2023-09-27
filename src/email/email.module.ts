import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[
     
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port: 6379,
      }
    }),
    BullModule.registerQueue({
      name:'email_queue',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailConsumer]
})
export class EmailModule {}
