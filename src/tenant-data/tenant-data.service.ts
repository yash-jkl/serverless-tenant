import { Injectable } from '@nestjs/common';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { Database } from '../utils/constants';
import { ClientTableService } from './client-table/client-table.service';

@Injectable()
export class TenantDataService {
  constructor(
    private readonly tenantService: TenantDatabaseService = new TenantDatabaseService(),
    private readonly clientTableService: ClientTableService = new ClientTableService()
  ) { }

  async getDataFromTenant(
    clients: any,
    parents: any,
    database: Database,

  ) {
    try {
      const clientDatabase = await this.tenantService.getDatabase(database);
      const client = await this.clientTableService.getClient(clientDatabase, parents);
      if (parents) {
        const parent = await this.clientTableService.getClient(clientDatabase, clients)
        if (!parent.rows[0]) await this.clientTableService.createClient(clientDatabase, parents);
      }
      if (!client.rows[0]) {
        await this.clientTableService.createClient(clientDatabase, clients);
      } else {
        await this.clientTableService.updateClient(clientDatabase, parents);
      }
      clientDatabase.release();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
