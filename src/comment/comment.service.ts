import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(tweetId: number, createCommentDto: CreateCommentDto) {
    const tweet = await this.prisma.tweet.findUnique({ where: { id: tweetId } });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    return this.prisma.comment.create({
      data: {
        content:createCommentDto.content,
        tweet: { connect: { id: tweetId } },
      },
    });
  }

  async getComments(tweetId: number) {
    return this.prisma.comment.findMany({
      where: { tweetId },
    });
  }

  async getCommentById(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async updateComment(id: number, updateCommentDto: CreateCommentDto) {
    const existingComment = await this.getCommentById(id);
    // if(!existingComment){
    //     throw new NotFoundException('No comment found')
    // }
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: number) {
    await this.getCommentById(id);
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
