import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { eventType } from '../../utils/constants';

@Injectable()
export class ClientTableService {
  constructor(
    private readonly databaseService: DatabaseService = new DatabaseService(),
  ) {}

  async getClientData(data: eventType) {
    let parents = null;
    const ids = data.id;
    try {
      const clients = await this.getClient(ids);
      const getClientFinancialProfiles = await this.getClientFinancialProfiles(
        clients[0].id,
      );
      if (clients[0].parent_id) {
        parents = await this.getClient(clients[0].parent_id);
      }
      return {
        clients,
        getClientFinancialProfiles,
        parents,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getClient(clientId: string) {
    return await this.databaseService.query(
      `select * from clients where id in ('${clientId}');`,
    );
  }

  async getClientFinancialProfiles(clientId: string) {
    return await this.databaseService.query(
      `select * from client_financial_profiles where id ='${clientId}';`,
    );
  }
}
