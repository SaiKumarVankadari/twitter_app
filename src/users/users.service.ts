import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// import { User } from '../users/users.controller';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService,) {}

    async getUser(id: number){
        return await this.prisma.user.findUnique({where:{id}})
    }

    async getUsers(){
        return await this.prisma.user.findMany({ select:{id: true, username:true, email: true}})
    }
    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
    }

    async softDelete(id: number): Promise<User | null> {
        // Check if the user exists
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
    
        // Update the user with the deletedAt timestamp
        const customUpdate = {
            deletedAt: new Date(),
          };
      
          const updatedUser = await this.prisma.user.update({
            where: { id },
            data: customUpdate,
          });
      
          return updatedUser;
      }

      async restore(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
    
        // Use a custom object to bypass type checking
        const customUpdate = {
          deletedAt: null,
        };
    
        const updatedUser = await this.prisma.user.update({
          where: { id },
          data: customUpdate,
        });
    
        return updatedUser;
      }

}
