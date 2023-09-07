import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from '../chatgpt/chatgpt.service';

@Controller('content-categorization')
export class ContentCategorizationController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('categorize')
  async categorizeContent(@Body() data: { text: string }): Promise<string> {
    const text = data.text;
    const analyzedText = await this.chatGptService.analyzeText(text);
    const category = this.categorize(analyzedText);
    return category;
  }

  private categorize(analyzedText: string): string {
    // Implement your content categorization logic here
    if (analyzedText.includes('positive')) {
      return 'Positive';
    } else if (analyzedText.includes('negative')) {
      return 'Negative';
    } else {
      return 'Neutral';
    }
  }
}
