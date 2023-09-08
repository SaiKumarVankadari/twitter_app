import { Controller, Post, Get, Param, Body, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CreateReplyDto } from './dto/replies.dto';
import { RepliesService } from './replies.service';

@Controller('comments/:commentId/replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async createReply(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.repliesService.createReply(commentId, createReplyDto);
  }

  @Get()
  async getRepliesByCommentId(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.repliesService.getRepliesByCommentId(commentId);
  }

  @Get(':id')
  async getReplyById(@Param('id', ParseIntPipe) id: number) {
    return this.repliesService.getReplyById(id);
  }

  @Put(':id')
  async updateReply(@Param('id', ParseIntPipe) id: number, @Body() updateReplyDto: CreateReplyDto) {
    return this.repliesService.updateReply(id, updateReplyDto);
  }

  @Delete(':id')
  async deleteReply(@Param('id', ParseIntPipe) id: number) {
    return this.repliesService.deleteReply(id);
  }
}
