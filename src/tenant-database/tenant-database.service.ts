import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { env } from '../env';

@Injectable()
export class TenantDatabaseService {
  async getClient(name): Promise<PoolClient> {
    const pool = new Pool({
      user: env.db.username,
      host: env.db.host,
      database: name,
      password: env.db.password,
      port: env.db.port,
    });
    return pool.connect();
  }

  async query(name: string, queryText: string, values?: any[]): Promise<any> {
    const client = await this.getClient(name);
    try {
      const result = await client.query(queryText, values);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
