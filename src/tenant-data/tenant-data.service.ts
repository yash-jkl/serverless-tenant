import { Injectable } from '@nestjs/common';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { Database } from '../utils/constants';
import { ClientTableService } from './client-table/client-table.service';

@Injectable()
export class TenantDataService {
  constructor(
    private readonly tenantService: TenantDatabaseService = new TenantDatabaseService(),
    private readonly clientTableService: ClientTableService = new ClientTableService(),
  ) {}

  async getDataFromTenant(
    clients: any,
    clientFinancialProfiles: any,
    parents: any,
    database: Database,
  ) {
    try {
      const clientDatabase = await this.tenantService.getDatabase(database);
      if (parents) {
        const parent = await this.clientTableService.getClient(
          clientDatabase,
          parents,
        );
        if (!parent?.rows?.length) {
          await this.clientTableService.createClient(clientDatabase, parents);
        }
      }
      const client = await this.clientTableService.getClient(
        clientDatabase,
        clients,
      );
      if (!client?.rows?.length) {
        await this.clientTableService.createClient(clientDatabase, clients);
        await this.clientTableService.createClientFinancialProfiles(
          clientDatabase,
          clientFinancialProfiles,
        );
      } else {
        await this.clientTableService.updateClient(clientDatabase, clients);
        const getClientFinancialProfileData =
          await this.clientTableService.getClientFinancialProfileData(
            clientDatabase,
            clientFinancialProfiles,
          );
        if (getClientFinancialProfileData.rows.length) {
          await this.clientTableService.updateClientFinancialProfiles(
            clientDatabase,
            clientFinancialProfiles,
          );
        } else {
          await this.clientTableService.createClientFinancialProfiles(
            clientDatabase,
            clientFinancialProfiles,
          );
        }
      }
      clientDatabase.release();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
