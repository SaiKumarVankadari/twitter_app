import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets"
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit{
    onModuleInit() {
        this.server.on('connection', (socket)=>{
            console.log(socket.id) 
            console.log('connected...')
        })
    }
     
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('newMessage')
    onNewMwssage(@MessageBody() body: any){
        console.log(body)
        this.server.emit('onMessage',{
            content: body,
        })

    }
}