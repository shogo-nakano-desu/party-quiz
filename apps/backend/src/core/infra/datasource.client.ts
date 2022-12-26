import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
@Injectable()
export class DatasourceClient extends PrismaClient implements OnModuleInit {
  private static _instance: PrismaClient;

  private constructor() {
    super({
      datasources: {
        db: {
          url:
            process.env.DATABASE_URL + '?connection_limit=10&pool_timeout=15',
        },
      },
    });
  }

  // we need to use singleton pattern to avoid there are too many connections
  static getInstance() {
    if (!DatasourceClient._instance) {
      DatasourceClient._instance = new DatasourceClient();
    }
    return DatasourceClient._instance;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
