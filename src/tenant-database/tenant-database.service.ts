import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class TenantDatabaseService {
  async getDatabase(database: {
    DB_USERNAME: any;
    DB_HOST: any;
    DB_DATABASE: any;
    DB_PASSWORD: any;
    DB_PORT: any;
  }): Promise<PoolClient> {
    const pool = new Pool({
      user: database.DB_USERNAME,
      host: database.DB_HOST,
      database: database.DB_DATABASE,
      password: database.DB_PASSWORD,
      port: database.DB_PORT,
    });
    return pool.connect();
  }
}
