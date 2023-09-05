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


@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PassportModule, 
    JwtModule.register({ // Use JwtModule.register to configure JwtModule
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }), TweetsModule, ReactionsModule,
    
],
  providers: [PrismaService, LocalStrategy,AuthService, TweetsService],
  controllers: [TweetsController],
})
export class AppModule {}
