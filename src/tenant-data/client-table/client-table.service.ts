import { Injectable } from '@nestjs/common';
import { TenantDatabaseService } from '../../tenant-database/tenant-database.service';
import { getClientQuery, insertClientQuery, updateClientQuery } from '../helper';

@Injectable()
export class ClientTableService {
    constructor(
        private readonly tenantService: TenantDatabaseService = new TenantDatabaseService(),
    ) { }

    async getClient(client, data, values?: any[]) {
        try {
            const queryText = getClientQuery(data)
            return client.query(queryText, values)

        } catch (error) {
            console.log(error);
        }
    }

    async createClient(client, data, values?: any[]){
        try {
            console.log('Creating Client')
            const queryText = insertClientQuery(data)
            return client.query(queryText, values)

        } catch (error) {
            console.log(error);
        }
    }

    async updateClient(client, data, values?: any[]){
        try {
            console.log('Updating Client')
            const queryText = updateClientQuery(data)
            return client.query(queryText, values)

        } catch (error) {
            console.log(error);
        }
    }
}
