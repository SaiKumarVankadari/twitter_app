import { Controller, Get, Param, ParseIntPipe, UseGuards, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/jwt.guard';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseIntPipe)  id: number){
    return this.usersService.getUser(id)
  }

  @Get()
  getUsers(){
    return this.usersService.getUsers()
  }
  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<User | null> {
    return this.usersService.softDelete(+id);
  }

  @Get(':id/restore')
  async restore(@Param('id') id: string): Promise<User | null> {
    return this.usersService.restore(+id);
  }
}
