import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger'; 

@ApiTags('ToDo')
@Controller('auth')
export class AuthController {
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.handleGoogleRedirect(req);
  }

  
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('signup')
  signup( @Body() dto:AuthDto){
    return this.authService.signup(dto)
  }

  // @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Body() dto:AuthDto, @Req() req, @Res() res){
    return this.authService.signin(dto, req, res)
  }
  // @UseGuards(AuthGuard('local'))
  @Get('signout')
  signout(@Req() req, @Res() res){
    return this.authService.signout(req, res)
  }
}
