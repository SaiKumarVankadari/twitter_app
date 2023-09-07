import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './auth/local.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsModule } from './tweets/tweets.module';
import { TweetsService } from './tweets/tweets.service';
import { ReactionsModule } from './reactions/reactions.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ChatGptService } from './chatgpt/chatgpt.service';
import { ContentCategorizationController } from './content-categorization/content-categorization.controller';
import { ContentCategorizationModule } from './content-categorization/content-categorization.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PassportModule, 
    JwtModule.register({ // Use JwtModule.register to configure JwtModule
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }), TweetsModule, ReactionsModule, EmailModule,  ContentCategorizationModule, CommentModule
    
],
  providers: [PrismaService, LocalStrategy,AuthService, TweetsService, EmailService, ChatGptService,],
  controllers: [TweetsController, ContentCategorizationController],
})
export class AppModule {}
