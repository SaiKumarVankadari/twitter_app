import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { EmailController } from 'src/email/email.controller';
import { BullModule } from '@nestjs/bull';
import { AuthDto } from './dto/auth.dto';
// import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [JwtModule, PassportModule, PrismaModule,EmailModule,
    BullModule.registerQueue({
      name: 'email_queue',
    }),
  ],
  controllers: [AuthController, EmailController],
  providers: [AuthService,EmailService, AuthDto],
})
export class AuthModule {}

// GoogleStrategy