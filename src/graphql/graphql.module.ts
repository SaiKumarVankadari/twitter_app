import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user.resolver';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthDto } from 'src/auth/dto/auth.dto';


@Module({
  imports:[
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule
  ],
  providers: [UserResolver, UsersService, AuthService, JwtService, AuthDto]
})
export class GraphqlModule {}
//