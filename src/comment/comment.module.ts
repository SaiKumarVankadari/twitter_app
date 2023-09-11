import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentModule {}
