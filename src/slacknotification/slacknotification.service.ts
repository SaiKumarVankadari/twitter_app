import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';
@Injectable()
export class SlackNotificationService {
  constructor(private httpService: HttpService) {}

  async sendSlackMessage(message: string, webhookUrl: string): Promise<void> {
    try {
      const payload = {
        text: message,
      };

      await this.httpService.post(webhookUrl, payload).toPromise();
      // await this.httpService.post(url, payload).toPromise();
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error sending message to Slack:', error);
    }
  }
}