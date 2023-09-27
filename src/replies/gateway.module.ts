// websocket.module.ts
import { Module } from '@nestjs/common';
import { RepliesGateway } from './replies.gateway';

@Module({
  providers: [RepliesGateway],
})
export class WebSocketModule {}

