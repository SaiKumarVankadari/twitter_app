// src/middleware/recaptcha.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { env } from 'process';
// import config from '../config.env';

@Injectable()
export class RecaptchaMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { recaptchaResponse } = req.body;

    try {
      const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        undefined,
        {
          params: {
            secret: env.RECAPTCHA_SECRET_KEY,
            response: recaptchaResponse,
          },
        }
      );

      if (response.data.success) {
        next(); // reCAPTCHA validation passed, continue with the request
      } else {
        res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred during reCAPTCHA verification' });
    }
  }
}
