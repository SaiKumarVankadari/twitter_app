import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// import { User } from '../users/users.controller';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
     
    async getUser(id: number){
        return await this.prisma.user.findUnique({where:{id}})
    }

    async getUsers(){
        return await this.prisma.user.findMany({ select:{id: true, email: true}})
    }
    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
    }

}
