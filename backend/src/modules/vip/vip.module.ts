import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { VipService } from './vip.service';
import { VipController } from './vip.controller';

@Module({
  imports: [DatabaseModule],
  providers: [VipService],
  controllers: [VipController],
  exports: [VipService],
})
export class VipModule {}
