// websocket.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RepliesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('replyAdded')
  handleReplyAdded(client: any, payload: any) {
    this.server.emit('replyAdded', payload);
    console.log("Reply given")
  }
}
