import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetsService {
    constructor(private prisma: PrismaService){}

    async createTweet(createTweetDto:CreateTweetDto){
        return this.prisma.tweet.create({
            data:createTweetDto,
        });
    }

    async findAllTweets(){
        return this.prisma.tweet.findMany();
    }

    async findTweetById(id: number){
        const tweet = await this.prisma.tweet.findUnique({ where:{ id}});
        if(!tweet){
            throw new NotFoundException('Tweet not found');
        }
        return tweet;
    }

    async updatetweet(id:number, updateTweetDto: UpdateTweetDto){
        const existingTweet= await this.findTweetById(id);
        if(!existingTweet){
            throw new NotFoundException('No tweet found');
        }
        return this.prisma.tweet.update({
            where:{ id } ,
            data: updateTweetDto,
        });
    }

    async deleteTweet(id:number){
        const existingTweet= await this.findTweetById(id);
        if(!existingTweet){
            throw new NotFoundException('No tweet found');
        }
        return this.prisma.tweet.delete({
            where: { id },
        });
    }
}
