import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtSecret} from '../utils/constants';
import { Request, Response } from 'express';
// import { EmailService } from './email.service';


@Injectable()
export class AuthService {
    findOrCreateUserFromGoogle(arg0: { googleId: any; email: any; name: any; }) {
        throw new Error('Method not implemented.');
    }
    handleGoogleRedirect(req: any) {
      throw new Error('Method not implemented.');
    }
    async validateUser(username: string, email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
    }

    constructor(private jwt: JwtService, private prisma: PrismaService )  {}
    // private readonly emailService: EmailService,

    async signup(dto:AuthDto) {
        const { username, email, password  } = dto;

        const foundUser = await this.prisma.user.findUnique({where: {email}})
        
        if(foundUser){
            throw new BadRequestException('Email already exists')
        }

        const hashedPassword = await this.hashPassword(password)

        await this.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        // await this.emailService.sendWelcomeEmail(dto.email);

        return { message: 'signup was succesful'};
    }

    

    async signin(dto: AuthDto, req: Request, res: Response) {
        const {username,  email, password  } = dto;

        const foundUser = await this.prisma.user.findUnique({where: {email}})
        
        if(!foundUser){
            throw new BadRequestException('Email does not exist')
        }

        const isMatch = await this.comparePasswords({
            password,
            hash: foundUser.password
        })

        if(!isMatch){
            throw new BadRequestException('Wrong password')
        }

        const token = await this.signToken({ id: foundUser.id, email: foundUser.email})


        if(!token){
            throw new ForbiddenException()
        }

        res.cookie('token', token)
        return res.send({message: 'logged in succesfully'})
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({message: 'Signed out succesfully'})
    }

    async hashPassword(password: string){

        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
        
    }

    async comparePasswords(args: {password:string, hash:string}){
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: {id:number, email:string}){
        const payload = args 

        return this.jwt.signAsync(payload, {secret:jwtSecret})
    }



    
}
