import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatGptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: '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',
    });
  }

  async analyzeText(text: string): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        model: 'text-davinci-002',
        prompt: text,
        max_tokens: 50, // Adjust as needed
      });
      return response.choices[0].text.trim();
    } catch (error) {
      throw error;
    }
  }
}
