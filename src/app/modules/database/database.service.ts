import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { prismaPasswordMiddleware } from './middlewares/password-encryption.middleware';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    super({ datasources: { db: { url: config.get('DATABASE_URL') } } });
    this.$use(prismaPasswordMiddleware);
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
