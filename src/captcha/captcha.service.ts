// captcha.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  // generateCaptcha(): string {
  //   // Generate a random alphanumeric CAPTCHA challenge
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const captcha = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  //   return captcha;
  // }
}
