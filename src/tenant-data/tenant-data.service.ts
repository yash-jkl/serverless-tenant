import { Injectable } from '@nestjs/common';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { eventType } from '../utils/constants';

@Injectable()
export class TenantDataService {
  constructor(
    private readonly tenantService: TenantDatabaseService = new TenantDatabaseService(),
  ) {}

  async getDataFromTenant(data: eventType, name: string) {
    const query = `id = '${data.id}'`;
    try {
      const clients = await this.tenantService.query(
        name,
        `select * from clients where ${query};`,
      );
      return clients[0];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
