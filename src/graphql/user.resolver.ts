// src/graphql/user.resolver.ts

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthInput, AuthResponse, User } from './user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';



@Resolver(() => User)
export class UserResolver {
    constructor(private readonly usersService: UsersService, private readonly authService:AuthService) {}


  @Query(() => [User]) // Define a nullable return type for single-user query
  async usersall() {
    return this.usersService.getUsers();
  }

  @Query(() => User, { nullable: true }) // Define a nullable return type for single-user query
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUser(id);
  }

  @Mutation(() => AuthResponse)
  async signup(@Args('input') input: AuthInput): Promise<AuthResponse> {
    const { username, email, password } = input;

    try {
      const { message, user } = await this.authService.signup({ username, email, password });

      // You can set a token in the context or response here if needed

      return {
        message,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            password: ''
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
