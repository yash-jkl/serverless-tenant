import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { eventType } from '../utils/constants';

@Injectable()
export class MainDatabaseService {
  constructor(
    private readonly databaseService: DatabaseService = new DatabaseService(),
  ) {}

  async getClientData(data: eventType) {
    const query = `id = '${data.id}'`;
    try {
      const clients = await this.databaseService.query(
        `select * from clients where ${query};`,
      );
      const podId = await this.databaseService.query(
        `select pod_id from tenant_pods where tenant_id ='${
          clients[0].parent_id ?? clients[0].id
        }'; `,
      );
      const podCredentials = await this.databaseService.query(
        `select * from pods where id = '${podId[0].pod_id}';`,
      );
      return [clients[0], podCredentials];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
