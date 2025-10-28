import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entities/user.entity';
import { Match } from './entities/match.entity';
import { Connection } from './entities/connection.entity';
import { Post } from './entities/post.entity';
import { Reaction } from './entities/reaction.entity';
import { Gift } from './entities/gift.entity';
import { Payment } from './entities/payment.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'vip2_user',
  password: process.env.DB_PASSWORD || 'vip2_password',
  database: process.env.DB_NAME || 'vip2_0',
  entities: [User, Match, Connection, Post, Reaction, Gift, Payment],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
