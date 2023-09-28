import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './auth/local.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsModule } from './tweets/tweets.module';
import { TweetsService } from './tweets/tweets.service';
import { ReactionsModule } from './reactions/reactions.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { CommentModule } from './comment/comment.module';
import { RepliesModule } from './replies/replies.module';
import { GatewayModule } from './gateway/gateway.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { OpenAIService } from './open-ai/open-ai.service';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronsService } from './crons/crons.service';
import { CaptchaModule } from './captcha/captcha.module';
import { UploadModule } from './upload/upload.module';
import {  RecaptchaMiddleware } from './captcha/captcha.middleware';
import { CaptchaService } from './captcha/captcha.service';
import { BullModule } from '@nestjs/bull';
// import { RecaptchaValidationMiddleware } from './captcha/captcha.middleware';
import { GraphqlModule } from './graphql/graphql.module';
import { SlackCronService } from './slacknotification/slackcron.service';
import { SlackNotificationService } from './slacknotification/slacknotification.service';
import { SlackController } from './slacknotification/slacknotification.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthDto } from './auth/dto/auth.dto';
import { GoogleStrategy } from './auth/google.strategy';
import * as admin from 'firebase-admin';
// import { SentryModule } from '@nestjs/sentry';
import { FirebaseModule } from './firebase/firebase.module';
import { FirestoreController } from './firebase/firebase.controller';
import { FirestoreService } from './firebase/firebase.service';
import { MongoModule } from './mongoose/mongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { RedisCacheModule } from './redis-cache.module';



@Module({
  imports: [RedisCacheModule, AuthModule, PrismaModule, UsersModule, PassportModule, AppModule,
    JwtModule.register({ // Use JwtModule.register to configure JwtModule
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }), 
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port: 6379,
      }
    }),
    BullModule.registerQueue({
      name:'email_queue',
    }),

    MulterModule.register({
      dest: './upload', // Set the upload destination
    }),
    // SentryModule.forRoot({

    // }),
    PassportModule.register({defaultStrategy:'google'}),

   MongooseModule.forRoot('mongodb://localhost/myDb'),
    
    ScheduleModule.forRoot(), TweetsModule, ReactionsModule, EmailModule, CommentModule, RepliesModule, GatewayModule, OpenAiModule, NotificationsModule, CaptchaModule, UploadModule, GraphqlModule, HttpModule, FirebaseModule, MongoModule, FileModule
    
],
  providers: [PrismaService, JwtService,AuthDto, LocalStrategy,AuthService, TweetsService, EmailService, OpenAIService, CronsService, CaptchaService, SlackCronService, SlackNotificationService, GoogleStrategy, FirestoreService],
  controllers: [TweetsController, SlackController, FirestoreController ],
})
export class AppModule implements NestModule {
  constructor(){admin.initializeApp({
    credential:admin.credential.cert({
      projectId:'twitterclone-83f25',
      clientEmail:'firebase-adminsdk-frrnp@twitterclone-83f25.iam.gserviceaccount.com',
      privateKey:"-----BEGIN PRIVATE KEY-----MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDTU/InNrbOIqgxxxBOwFWlNSIEWRMy7e3RxBhq5FJYPqLt+2F8RroTBhH5l9WKRMIDClHTupo7s6SLo8GIPk60/Q1yOFmFPiivxdFf1RT8HH8YQvIYaamkWjdru2RiCr7M8L5+PgSlHkPW/OrfdMELIpmYEqJaVPqZOp3uRpWamnChI7ENUxrWjPak97sYaed2jF9hTERSXBNLdfvRuo0SvS6cBdwp91hIk+N+5iGt3P3MVAteCL7OFFEGQGRwK6RV/4woHr4adXU5n+VvjHIJH5sjVqEVtu+FIWSKsUax/NNvMKydk2CCYQrheEGHx39LhypBV4P7+TybT1y634nRAgMBAAECgf8NGWlLHXLequNV/5CocKBwSYc4Q2Kk2/gLsOsY7Tb/k+2W3Qhg6er6mZezlHqmDEA5qqpYgr0vZFg+8Mb89G2Kn6Rv3TMKIa+aAaLzueCto2YcxTVqYmCKpKb3q87DLY+fBeIjvBpkzyzq86DRg43g5JrZ0lH0i9B0JV/+gaXmAKdX7LSpjKCM+54pRvMEz9Xfx1goomm4wgCBiTSlEK6uqt3txWB1d9BhLx3yEUBzFHD28eLX5Rc42CZ95fepJQ0QO1KrgDPOzEw7P0Awhfn2KOy14qAJqNdXeDGA6/g+tbJabA3IqCxTrHffvYPDKLWj5+PBZQ4C5aBnlotBrAECgYEA7zMMUF0/nWE2bZ//gfvK7ER5QsIcP33kvMt+LHPm5WJsNA8aQUtvRAOHwm0q0BbXhSqwb02VwTUGyrAfHm+sWmgTsilGEogf55NmWwvSZAqSnDYBed0pQvrexZq+19Tndgaf8FoUiUfZzDe5Cw2grtTWziMW0oGAzOL228XMgcECgYEA4ivAVHSO6rc13XaQT1UMu66P8LRaqg0ZZLCvhug1aEaqAbT0fmpzew7VIlH8tvcHz7YE0hBiDt1lCMmM+nXqIiD0uSGywJ+yRGqou0NxUdIwagp+h4X5KftRYnCxVlI368k+hOFz9z3FKtYzo8uksnj5Pq62vYCl/7X5wjHt7BECgYA2sG04Upmg2gEfv10j0vXqXx16bfcXbSlHIR+P+k/oUkB7BpjyJNUjr8ryYRNQ0GgmQkRkrlB3BDCxVuNGijHV2cXnDhi/U/A3ejQEzQclaGVs4cwkmLQ+ZC1a8K6BmmPxUEJxKadYW90oG/Vq2YrLbk5OgydMqd9Q+POH/AluAQKBgQDTUjHIN4f5gumPXWKE3WCiU/4l1z4HOWoKjJPUp06PeccLBTqUi34O8tLt2FEZ20KvLtDePXSBkxb92OQieN4kuUovWG8eT5hPGKFDJ0bQPmYCDoAevG0MbseiBM2NbBDX/BawLb8eudZpqe5iErp2D1ZC3RfdhECV5j/Q1LoLIQKBgFTVun5ufaxymEhbJoxAM85WQTMOdVzKI7/vdfbbTorvkz1scgV1v47ngfh2XegB4b+FT4OqBfE5ZWYsgfea70iAL2LlQ2v2wi/WIe1Q994cDcChtCMRr4Upvl0Owpov6NKkJaVDp544xn+NHvYxNUZwJ742UWDPCv/HuL6ALc0W-----END PRIVATE KEY-----",
    })
  }) }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RecaptchaMiddleware)
      .forRoutes('your-protected-route'); // Replace with the actual route(s)
  }
}
