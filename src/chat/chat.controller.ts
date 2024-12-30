import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Manejar mensajes enviados desde el gateway
  @MessagePattern('chat.sendMessage')
  async handleSendMessage(data: { taskId: string; content: string; userId: string }) {
    return this.chatService.saveMessage(data.taskId, data.content, data.userId);
  }

  // Recuperar mensajes para una tarea
  @MessagePattern('chat.getMessages')
  async handleGetMessages(taskId: string) {
    return this.chatService.getMessagesByTask(taskId);
  }
}
