import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
// import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [JwtModule, PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

// GoogleStrategy