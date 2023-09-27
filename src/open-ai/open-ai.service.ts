import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    // Initialize the OpenAI client with your API key
    this.openai = new OpenAI({ apiKey: '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' }); // Use 'secretKey'
  }

  async categorizeTweet(tweetText: string): Promise<string> {
    // Use GPT-3 to categorize the tweet without predefined categories
    try {
      // Use the correct endpoint for chat models
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use the latest chat model version
        messages: [
          { role: 'system', content: 'You are a helpful assistant that categorizes tweets.' },
          { role: 'user', content: `Categorize the following tweet: "${tweetText}"` },
        ],
      });

      // Extract the category from the GPT-3 response
      const category = response.choices[0].message.content.trim();

      return category;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to handle it at the controller level
    }
  }
}
