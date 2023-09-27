import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { OpenAIService } from 'src/open-ai/open-ai.service';

@Module({
  providers: [TweetsService, OpenAIService],
  controllers: [TweetsController]
})
export class TweetsModule {}
