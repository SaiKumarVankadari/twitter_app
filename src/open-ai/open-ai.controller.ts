import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';

@Controller('openai')
export class OpenAiController {

    constructor(private readonly chatGptService: OpenAIService) {}

    @Post('categorize') // Define your POST route path
    async categorizeTweet(@Body('text') tweetText: string): Promise<string> {
      const category = await this.chatGptService.categorizeTweet(tweetText);
      return category;
    }
}
