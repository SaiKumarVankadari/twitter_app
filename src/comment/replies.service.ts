import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReplyDto } from './dto/replies.dto';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}

  async createReply(commentId: number, createReplyDto: CreateReplyDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    

    // return this.prisma.reply.create({
    //   data: {
        
    //     content: createReplyDto.content,
    //     comment: { connect: { id: commentId } },
    //     authorId: createReplyDto.authorId,
    //   },
    // });
  }

  async getRepliesByCommentId(commentId: number) {
    return this.prisma.reply.findMany({
      where: { commentId },
    });
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
    return this.prisma.reply.update({
      where: { id },
      data: { content: updateReplyDto.content },
    });
  }

  async deleteReply(id: number) {
    await this.getReplyById(id);
    return this.prisma.reply.delete({
      where: { id },
    });
  }
}
