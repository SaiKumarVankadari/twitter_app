import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; 
import { AuthGuard } from './jwt.guard';
import { profile } from 'console';
import { GoogleGuard } from './google.guard';

@ApiTags('ToDo')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // await this.authService.findOrCreateUserFromGoogle(profile);
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    if (user) {
      res.redirect('/api');
    } else {
      res.redirect('/login-failed');
    }
  }

  // @UseGuards(AuthGuard('local'))
  @Post('signup')
  signup( @Body() dto:AuthDto){
    return this.authService.signup(dto)
  }

  @Post('signin')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  signin(@Body() dto:AuthDto, @Req() req, @Res() res){
    return this.authService.signin(dto, req, res)
  }
  // @UseGuards(AuthGuard('local'))
  @Get('signout')
  signout(@Req() req, @Res() res){
    return this.authService.signout(req, res)
  }
}
