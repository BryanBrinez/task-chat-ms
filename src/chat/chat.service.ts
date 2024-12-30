import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit  {


  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,

  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log("base de datos coenctada")
  }




  // Guardar un mensaje en la base de datos
  async saveMessage(taskId: string, content: string, userId: string) {
    return await this.chatMessage.create({
      data: {
        taskId,
        content,
        userId,
      },
    });
  }

  // Obtener todos los mensajes de una tarea
  async getMessagesByTask(taskId: string) {
    return await this.chatMessage.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
    });
  }
}