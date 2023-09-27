import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Patch, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from 'src/auth/jwt.guard';
import { Tweet } from '@prisma/client';


@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetService: TweetsService){}

    @Post()
    @UseGuards(AuthGuard)
    async createTweet(@Body() createTweetDto: CreateTweetDto){
        return this.tweetService.createTweet(createTweetDto);
    }

    @Get()
    // @UseGuards(AuthGuard)
    async findAllTweets(){
        return this.tweetService.findAllTweets();
    }
    @Get(':id')
    async findTweetById(@Param('id', ParseIntPipe) id: number){
        return this.tweetService.findTweetById(id);
    }

    @Put(':id')
    // @UseGuards(AuthGuard)
    async updateTweet(@Param('id', ParseIntPipe) id: number,@Body(new ValidationPipe()) updateTweetDto:CreateTweetDto){
        return this.tweetService.updatetweet(id,updateTweetDto);
    }

    @Delete(':id') 
    async softDeleteTweet(@Param('id') id: string): Promise<Tweet> {
      return this.tweetService.deleteTweet(+id);
    }
    @Get(':id/restore')
    async restoreTweet(@Param('id') id: string): Promise<Tweet> {
      return this.tweetService.restoreTweet(+id);
    }
}
