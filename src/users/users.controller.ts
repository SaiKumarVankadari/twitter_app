import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param() params :{ id: number}){
    return this.usersService.getUser(params.id)
  }

  @Get()
  getUsers(){
    return this.usersService.getUsers()
  }
}
