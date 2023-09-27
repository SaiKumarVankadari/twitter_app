// passport-config.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '661305819344-c790g2q71muekv2q79ph8ee75kporicm.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback', // Update with your callback URL
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Here, you can find or create a user based on the Google profile data.
    // Example code to find or create a user and return it.
    const user = {
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    };
    return done(null, user);
  }
}
