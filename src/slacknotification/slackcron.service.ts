import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { SlackNotificationService } from './slacknotification.service';

@Injectable()
export class SlackCronService {
  constructor(private readonly slackNotificationService: SlackNotificationService) {
    this.setupCronJobs();
  }

  private setupCronJobs() {
    cron.schedule('03 11 * * *', () => {
      this.sendDailySlackMessage();
    });
  }

  private sendDailySlackMessage() {
    const message = 'Good Morning, X_Team!';
    const personal = 'Tea Time!!';

    const webhookUrl = 'https://hooks.slack.com/services/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';
    const url= 'https://hooks.slack.com/services/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'

    this.slackNotificationService.sendSlackMessage(message, webhookUrl);
    this.slackNotificationService.sendSlackMessage(personal, url);
  }

  
}



