// src/graphql/user.entity.ts

import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  username: string;

  @Field()
  email: string;
  
  @Field({ nullable: true })
  password: string;
}

@InputType()
export class AuthInput {
  // @Field(() => Int)
  // id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  message: string;

  @Field(() => User)
  user: User;
}

