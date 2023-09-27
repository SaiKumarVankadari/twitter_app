import { Controller, Post, Body } from '@nestjs/common';
import { SlackNotificationService } from 'src/slacknotification/slacknotification.service';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackNotificationService) {}

  @Post('sendmessage')
  async sendSlackMessage(@Body() body: { message: string }) {
    const webhookUrl = 'https://hooks.slack.com/services/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 ';
    const url= 'https://hooks.slack.com/services/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'

    await this.slackService.sendSlackMessage(body.message, webhookUrl);
    await this.slackService.sendSlackMessage(body.message, url);


    return { message: 'Message sent to Slack' };
  }
}

// 

// 