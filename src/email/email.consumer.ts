// email.consumer.ts

import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Processor('email_queue') // Specify the queue name
@Injectable()
export class EmailConsumer {
  constructor() {}

  @Process('sendWelcomeMail') // Specify the task name
  async sendWelcomeMail(job) {
    const { mailOptions } = job.data;

    const transporter = nodemailer.createTransport({
    //   service: 'gmail',
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '4abeb752214c77',
        pass: '11eaee3b5a6544',
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome mail sent');
    } catch (error) {
      console.error('Error sending mail:', error);
      throw error; // This will make Bull retry the job according to the defined options
    }
  }
}
