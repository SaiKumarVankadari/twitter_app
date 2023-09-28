import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// import { User } from '../users/users.controller';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
      ) {}

      async getUser(id: number) {
        const cacheKey = `getUser_${id}`;
        const cachedUser = await this.cacheManager.get<User>(cacheKey);
        console.log(cachedUser);
        console.log(cacheKey);
    
        if (cachedUser) {
          console.log(`User with ID ${id} fetched from cache.`);
          return cachedUser;
        }
    
        // User not found in cache, fetch from the database
        const user = await this.prisma.user.findUnique({ where: { id } });
    
        if (user) {
          console.log(`User with ID ${id} fetched from the database.`);
          // Cache the user data with the TTL specified in the module configuration
          await this.cacheManager.set(cacheKey, user, 0);
        }
    
        return user;
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
