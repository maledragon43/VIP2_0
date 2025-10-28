import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { WebSocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  imports: [DatabaseModule],
  providers: [WebSocketGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
