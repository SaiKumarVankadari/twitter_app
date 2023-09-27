import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email_queue') private readonly emailQueue: Queue) {}

  async sendWelcomeMail(to: string) {
    const mailOptions = {
      from: 'vankadarisaikumar7@gmail.com',
      to: 'saikumarvankadari7@gmail.com',
      subject: 'Welcome to X!!!!',
      text: 'Welcome to X! We are excited to have you as a user.',
    };

    // Enqueue the email sending task
    await this.emailQueue.add('sendWelcomeMail', { mailOptions }, {delay: 10000});
  }
}
