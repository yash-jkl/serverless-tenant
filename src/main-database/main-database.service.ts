import { Injectable } from '@nestjs/common';
import { eventType } from '../utils/constants';
import { ClientTableService } from './client-table/client-table.service';
import { PodsService } from './pods/pods.service';

@Injectable()
export class MainDatabaseService {
  constructor(
    private readonly clientTableService: ClientTableService = new ClientTableService(),
    private readonly podsService: PodsService = new PodsService(),
  ) {}

  async getClientData(data: eventType) {
    try {
      const { clients, getClientFinancialProfiles, parents } =
        await this.clientTableService.getClientData(data);
      const { credential } = await this.podsService.getCredentials(
        parents[0].id ?? clients[0].id,
      );
      console.log(credential)
      return {
        clients: clients[0],
        getClientFinancialProfiles: getClientFinancialProfiles[0],
        parents: parents[0],
        credential: credential,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

}
