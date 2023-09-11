import { Module } from '@nestjs/common';
import { ContentCategorizationController } from './content-categorization.controller';
import { ChatGptService } from '../chatgpt/chatgpt.service';

@Module({
  controllers: [ContentCategorizationController],
  providers: [ChatGptService],
})
export class ContentCategorizationModule {}
