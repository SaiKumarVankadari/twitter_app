import { Module } from '@nestjs/common';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { RepliesGateway } from './replies.gateway';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService, RepliesGateway]
})
export class RepliesModule {}
