import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // CORS muammolaridan qochish uchun
  },
})

export class ChatController implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: { [key: string]: string } = {}; // Onlayn foydalanuvchilar ro'yxati
  private messageHistory: { username: string; message: string; time: string }[] = []; // Xabarlar tarixi

  handleConnection(client: Socket) {
    console.log(`Online: ${client.id}`);
    this.users[client.id] = 'Unknown'; // Avvaliga foydalanuvchi nomi yo'q
    this.server.emit('users', Object.values(this.users)); // Onlayn foydalanuvchilar ro'yxatini yangilash

    // Xabarlar tarixini yangidan ulangan foydalanuvchiga yuborish
    client.emit('messageHistory', this.messageHistory);
  }

  handleDisconnect(client: Socket) {
    console.log(`Offline: ${client.id}`);
    delete this.users[client.id]; // Foydalanuvchini o'chirish
    this.server.emit('users', Object.values(this.users)); // Onlayn foydalanuvchilar ro'yxatini yangilash
  }

  @SubscribeMessage('set username')
  handleSetUsername(client: Socket, username: string): void {
    this.users[client.id] = username; // Foydalanuvchi ismini belgilash
    client.data.username = username; // Foydalanuvchi malumoti clientda saqlanadi
    this.server.emit('users', Object.values(this.users)); // Onlayn foydalanuvchilar ro'yxatini yangilash
  }

  @SubscribeMessage('chat message')
  handleMessage(client: Socket, message: string): void {
    const username = client.data.username || 'Unknown'; // Username yo'qligi holatida
    const time = new Date().toLocaleTimeString(); // Xabar yuborilgan vaqt
    const formattedMessage = `${username}: ${message} (${time})`;

    // Xabarlar tarixiga qo'shish
    this.messageHistory.push({ username, message, time });
    if (this.messageHistory.length > 100) {
      this.messageHistory.shift(); // Eski xabarlarni o'chirish (tarix hajmini cheklash)
    }

    this.server.emit('chat message', formattedMessage); // Xabarni barcha foydalanuvchilarga tarqatish
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket): void {
    const username = client.data.username || 'Unknown';
    client.broadcast.emit('typing', `${username} yozmoqda...`);
  }
}
