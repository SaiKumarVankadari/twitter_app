import { Injectable, NotFoundException, ForbiddenException, Body, ValidationPipe } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Tweet } from '@prisma/client';

@Injectable()
export class TweetsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(createTweetDto: CreateTweetDto) {
    // Assuming CreateTweetDto has the necessary properties for creating a tweet
    try {
      const tweet = await this.prisma.tweet.create({
        data: {
          content: createTweetDto.content,
          authorId: createTweetDto.authorId, // You need to get the authorId from the authenticated user
        },
      });
      return tweet;
    } catch (error) {
      throw new ForbiddenException('Unable to create tweet');
    }
  }

  async findAllTweets() {
    return this.prisma.tweet.findMany({
      include: {
        author: true,
        comments: true,
        reactions: true,
        categories: true,
      },
    });
  }

  async findTweetById(id: number) {
    const tweet = await this.prisma.tweet.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
        reactions: true,
        categories: true,
      },
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    return tweet;
  }

  async updatetweet(id: number, updateTweetDto: CreateTweetDto) {
    try {
      const tweet = await this.prisma.tweet.update({
        where: { id },
        data: {
          content: updateTweetDto.content,
        },
      });
      return tweet;
    } catch (error) {
        console.error("error",error)
      throw new ForbiddenException('Unable to update tweet', error);
    }
  }

  // async deleteTweet(id: number) {
  //   try {
  //     const tweet = await this.prisma.tweet.delete({
  //       where: { id },
  //     });
  //     return tweet;
  //   } catch (error) {
  //     throw new ForbiddenException('Unable to delete tweet');
  //   }
  // }

  async deleteTweet(id: number): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.update({
        where: { id }, // Use only the ID in the where condition
        data: { deletedAt: new Date() }, // Set the deletedAt timestamp
      });
      return tweet;
    } catch (error) {
      throw new ForbiddenException('Unable to soft delete tweet');
    }
  }

  async restoreTweet(id: number): Promise<Tweet> {
    try {
      const tweet = await this.prisma.tweet.update({
        where: { id, deletedAt: { not: null } }, // Only restore if deletedAt is not null
        data: { deletedAt: null }, // Clear the deletedAt timestamp to restore
      });
      return tweet;
    } catch (error) {
      throw new ForbiddenException('Unable to restore tweet');
    }
  }
  
}
