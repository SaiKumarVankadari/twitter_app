import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetService: TweetsService){}

    @Post()
    async createTweet(@Body() createTweetDto: CreateTweetDto){
        return this.tweetService.createTweet(createTweetDto);
    }

    @Get()
    async findAllTweets(){
        return this.tweetService.findAllTweets();
    }
    @Get(':id')
    async findTweetById(@Param('id', ParseIntPipe) id: number){
        return this.tweetService.findTweetById(id);
    }

    @Put(':id')
    async updateTweet(@Param('id', ParseIntPipe) id: number, updateTweetDto:CreateTweetDto){
        return this.tweetService.updatetweet(id,updateTweetDto);
    }

    @Delete(':id')
    async deleteTweet(@Param('id', ParseIntPipe) id: number){
        return this.tweetService.deleteTweet(id);
    }
}
