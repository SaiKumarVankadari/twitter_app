// replies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Import PrismaService
import { CreateReplyDto } from './dto/create-reply.dto'; // Create these DTOs
import { RepliesGateway } from './replies.gateway';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService, private repliesGateway: RepliesGateway) {}

  async createReply(commentId: number, createReplyDto: CreateReplyDto) {
    const commentExists = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!commentExists) {
      throw new NotFoundException('Comment not found');
    }

    const { content, userId } = createReplyDto;

    // Create the reply and associate it with the comment
    const newReply = await this.prisma.reply.create({
      data: {
        content,
        // userId,
        comment: { connect: { id: commentId } },
        user: { connect: { id: userId } },
      } as unknown as Prisma.ReplyCreateInput,
    });

    this.repliesGateway.server.emit('replyAdded', newReply);

    return newReply;
  }

  async getReplyById(id: number) {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }
    return reply;
  }

  async updateReply(id: number, updateReplyDto: CreateReplyDto) {
    const existingReply = await this.getReplyById(id);

    if(!existingReply){
      throw new NotFoundException('Reply Not found');
    }

    return this.prisma.reply.update({
      where: { id },
      data:{
        content: updateReplyDto.content,
        userId:updateReplyDto.userId,
      }
    });
  }

  async deleteReply(id: number) {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });
  
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }
  
    // Perform soft delete by setting the deletedAt field
    return this.prisma.reply.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async recoverReply(id: number) {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });
  
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }
  
    if (reply.deletedAt === null) {
      throw new NotFoundException('Reply is not deleted');
    }
  
    // Perform recovery by setting the deletedAt field to null
    return this.prisma.reply.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
  
  



  async getReplyOwnerUserId(replyId: number) {
    const reply = await this.prisma.reply.findUnique({
      where: { id: replyId },
      select: { userId: true }, 
    });
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }
    return reply.userId;
  }


  

}
