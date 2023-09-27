import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway()
  export class CommentsGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('chatMessage')
    handleChatMessage(client: any, payload: any) {
      // Broadcast the message to all connected clients
      this.server.emit('chatMessage', payload);
    }
  }
  