import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Match } from './entities/match.entity';
import { Connection } from './entities/connection.entity';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { Gift } from './entities/gift.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Match,
      Connection,
      Post,
      Reaction,
      Gift,
      Payment,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
