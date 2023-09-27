// replies.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto'; // Import DTOs
import { AuthGuard } from 'src/auth/jwt.guard';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post(':commentId')
  async createReply(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() createReplyDto: CreateReplyDto,
    
  ) {
    return this.repliesService.createReply(commentId, createReplyDto);
  }

  @Get(':id')
  async getReplyById(@Param('id', ParseIntPipe) id: number) {
    return this.repliesService.getReplyById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateReply(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReplyDto: CreateReplyDto,
    @Request() req: any,
  ) {

    // const replyOwnerUserId = await this.repliesService.getReplyOwnerUserId(id);

    // if (req.user.id !== replyOwnerUserId) {
    //   throw new UnauthorizedException('You are not the owner of this reply');
    // }
    return this.repliesService.updateReply(id, updateReplyDto);
  }

  @Delete(':id')
  async deleteReply(@Param('id', ParseIntPipe) id: number) {
    return this.repliesService.deleteReply(id);
  }

  @Get(':id/recovery')
  async recoverReply(@Param('id', ParseIntPipe) id: number) {
    return this.repliesService.recoverReply(id);
  }
}
