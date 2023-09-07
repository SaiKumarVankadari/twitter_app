import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CommentsService } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':tweetId')
  async createComment(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(tweetId, createCommentDto);
  }

  @Get()
  async getComments(@Param('tweetId') tweetId: number) {
    return this.commentsService.getComments(tweetId);
  }

  @Get(':id')
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getCommentById(id);
  }

  @Put(':id')
  async updateComment(@Param('id',ParseIntPipe) id: number, @Body() updateCommentDto: CreateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }
}
