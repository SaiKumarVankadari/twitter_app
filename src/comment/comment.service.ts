import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Import your Prisma service
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {} // Inject your Prisma service

  async createComment(tweetId: number, createCommentDto: CreateCommentDto) {
    try {
      const { content, authorId } = createCommentDto;

      // Check if the tweet exists
      const tweet = await this.prisma.tweet.findUnique({
        where: { id: tweetId },
      });
      if (!tweet) {
        throw new NotFoundException('Tweet not found');
      }

      // Create the comment
      const comment = await this.prisma.comment.create({
        data: {
          content,
          authorId,
          tweetId,
        },
      });

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getComments(tweetId: number) {
    try {
      // Check if the tweet exists
      const tweet = await this.prisma.tweet.findUnique({
        where: { id: tweetId },
      });
      if (!tweet) {
        throw new NotFoundException('Tweet not found');
      }

      // Retrieve comments for the tweet
      const comments = await this.prisma.comment.findMany({
        where: { tweetId },
      });
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCommentById(id: number) {
    try {
      // Retrieve a comment by its ID
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateComment(id: number, updateCommentDto: CreateCommentDto) {
    try {
      const { content, authorId } = updateCommentDto;

      // Check if the comment exists
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      // Update the comment
      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: { content, authorId },
      });

      return updatedComment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteComment(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
  
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
  
    // Perform soft delete by setting the deletedAt field
    return this.prisma.comment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async recoverComment(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
  
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
  
    if (comment.deletedAt === null) {
      throw new NotFoundException('Comment is not deleted');
    }
  
    // Perform recovery by setting the deletedAt field to null
    return this.prisma.comment.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
  

}
