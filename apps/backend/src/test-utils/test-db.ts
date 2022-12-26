import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulid';

const url = process.env.DATABASE_URL;
const testUrl = `${url}_test`;
const testName = testUrl.split('/').pop();
const baseName = testUrl.replace(testName, '');

export class TestDB {
  private readonly client: PrismaClient;
  private readonly name: string;
  private readonly url: string;

  static rootClient = new PrismaClient({
    datasources: {
      db: { url },
    },
  });

  constructor() {
    this.name = TestDB.createName();
    this.url = baseName + this.name;
    this.client = new PrismaClient({
      datasources: {
        db: { url: `${this.url}` },
      },
    });
  }

  public async setup() {
    await this.dropDatabase();
    await this.createDatabase();
  }

  public async cleanup() {
    await this.client.$disconnect();
    await this.dropDatabase();
  }

  public getClient() {
    return this.client;
  }

  private async createDatabase() {
    try {
      await TestDB.rootClient.$executeRawUnsafe(
        `CREATE DATABASE ${this.name} WITH TEMPLATE ${testName};`,
      );
    } catch (error) {
      if ((error as any)?.meta?.code === '42P04') {
        return;
      }
      throw error;
    }
  }

  private async dropDatabase() {
    try {
      await TestDB.rootClient.$executeRawUnsafe(`DROP DATABASE ${this.name};`);
    } catch (error) {
      if ((error as any)?.meta?.code === '3D000') {
        return;
      }
      throw error;
    }
  }

  private static createName() {
    return `${testName}_${ulid(Date.now()).toLowerCase()}`;
  }
}
