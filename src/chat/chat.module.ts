import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [NatsModule]
})
export class ChatModule {}
