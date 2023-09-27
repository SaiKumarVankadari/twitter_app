// src/app.controller.ts

import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller()
export class CaptchaController {
  @Post('your-protected-route') // Replace with the actual route
  async submitForm(@Req() req, @Res() res) {
    // Process your form submission logic here
    return res.status(200).json({ message: 'Form submitted successfully' });
  }
}
