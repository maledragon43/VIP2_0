import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WebSocketService } from './websocket.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/chat',
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private webSocketService: WebSocketService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Authenticate user from token
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.userId = payload.sub;
      client.user = payload;

      // Join user to their personal room
      await client.join(`user:${client.userId}`);

      // Update user online status
      await this.webSocketService.setUserOnline(client.userId);

      // Notify user's connections that they're online
      await this.notifyConnectionsOnline(client.userId);

      console.log(`User ${client.userId} connected`);
    } catch (error) {
      console.error('Authentication failed:', error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      // Update user offline status
      await this.webSocketService.setUserOffline(client.userId);

      // Notify user's connections that they're offline
      await this.notifyConnectionsOffline(client.userId);

      console.log(`User ${client.userId} disconnected`);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string; message: string; type?: string },
  ) {
    if (!client.userId) return;

    const { receiverId, message, type = 'text' } = data;

    // Save message to database
    const savedMessage = await this.webSocketService.saveMessage({
      senderId: client.userId,
      receiverId,
      message,
      type,
    });

    // Send message to receiver
    this.server.to(`user:${receiverId}`).emit('new_message', {
      id: savedMessage.id,
      senderId: client.userId,
      receiverId,
      message,
      type,
      timestamp: savedMessage.createdAt,
    });

    // Send confirmation to sender
    client.emit('message_sent', {
      messageId: savedMessage.id,
      status: 'delivered',
    });
  }

  @SubscribeMessage('typing_start')
  async handleTypingStart(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('user_typing', {
      senderId: client.userId,
      isTyping: true,
    });
  }

  @SubscribeMessage('typing_stop')
  async handleTypingStop(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('user_typing', {
      senderId: client.userId,
      isTyping: false,
    });
  }

  @SubscribeMessage('video_call_offer')
  async handleVideoCallOffer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string; offer: any },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('video_call_offer', {
      senderId: client.userId,
      offer: data.offer,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('video_call_answer')
  async handleVideoCallAnswer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string; answer: any },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('video_call_answer', {
      senderId: client.userId,
      answer: data.answer,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('video_call_ice_candidate')
  async handleIceCandidate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string; candidate: any },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('video_call_ice_candidate', {
      senderId: client.userId,
      candidate: data.candidate,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('video_call_end')
  async handleVideoCallEnd(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string },
  ) {
    if (!client.userId) return;

    this.server.to(`user:${data.receiverId}`).emit('video_call_end', {
      senderId: client.userId,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('send_gift')
  async handleSendGift(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string; giftType: string; message?: string },
  ) {
    if (!client.userId) return;

    // Save gift to database
    const gift = await this.webSocketService.saveGift({
      senderId: client.userId,
      receiverId: data.receiverId,
      type: data.giftType,
      message: data.message,
    });

    // Send gift to receiver
    this.server.to(`user:${data.receiverId}`).emit('gift_received', {
      id: gift.id,
      senderId: client.userId,
      type: data.giftType,
      message: data.message,
      timestamp: gift.createdAt,
    });

    // Send confirmation to sender
    client.emit('gift_sent', {
      giftId: gift.id,
      status: 'delivered',
    });
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) return;

    await client.join(`room:${data.roomId}`);
    
    // Notify others in the room
    this.server.to(`room:${data.roomId}`).emit('user_joined_room', {
      userId: client.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string },
  ) {
    if (!client.userId) return;

    await client.leave(`room:${data.roomId}`);
    
    // Notify others in the room
    this.server.to(`room:${data.roomId}`).emit('user_left_room', {
      userId: client.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('room_message')
  async handleRoomMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { roomId: string; message: string; type?: string },
  ) {
    if (!client.userId) return;

    // Broadcast to all users in the room except sender
    this.server.to(`room:${data.roomId}`).emit('room_message', {
      senderId: client.userId,
      roomId: data.roomId,
      message: data.message,
      type: data.type || 'text',
      timestamp: new Date(),
    });
  }

  private async notifyConnectionsOnline(userId: string) {
    // Get user's connections
    const connections = await this.webSocketService.getUserConnections(userId);
    
    // Notify each connection
    for (const connection of connections) {
      this.server.to(`user:${connection.connectedUserId}`).emit('connection_online', {
        userId,
        timestamp: new Date(),
      });
    }
  }

  private async notifyConnectionsOffline(userId: string) {
    // Get user's connections
    const connections = await this.webSocketService.getUserConnections(userId);
    
    // Notify each connection
    for (const connection of connections) {
      this.server.to(`user:${connection.connectedUserId}`).emit('connection_offline', {
        userId,
        timestamp: new Date(),
      });
    }
  }
}
