import { Module } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';

@Module({
  providers: [OpenAIService],
  controllers: [OpenAiController]
})
export class OpenAiModule {}
