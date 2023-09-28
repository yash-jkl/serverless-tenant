import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { env } from '../env';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: env.db.username,
      host: env.db.host,
      database: env.db.database,
      password: env.db.password,
      port: env.db.port,
    });
  }

  async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async query(queryText: string, values?: any[]): Promise<any> {
    const client = await this.getClient();
    try {
      const result = await client.query(queryText, values);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
