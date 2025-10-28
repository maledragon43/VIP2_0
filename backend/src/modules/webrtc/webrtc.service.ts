import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebRTCService {
  constructor(private configService: ConfigService) {}

  getWebRTCConfig() {
    return {
      iceServers: [
        {
          urls: this.configService.get<string>('WEBRTC_STUN_SERVER', 'stun:stun.l.google.com:19302'),
        },
        {
          urls: this.configService.get<string>('WEBRTC_TURN_SERVER'),
          username: this.configService.get<string>('WEBRTC_TURN_USERNAME'),
          credential: this.configService.get<string>('WEBRTC_TURN_PASSWORD'),
        },
      ],
    };
  }

  generateRoomId(): string {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
