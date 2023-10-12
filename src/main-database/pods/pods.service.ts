import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class PodsService {
    constructor(
        private readonly databaseService: DatabaseService = new DatabaseService(),
    ) { }

    async getCredentials(data: string) {
        const podId = await this.databaseService.query(
            `select pod_id from tenant_pods where tenant_id ='${data}'; `,
        );
        const credentials = await this.databaseService.query(
            `select * from pods where id = '${podId[0].pod_id}';`,
        );
        return {
            credential: credentials[0]
        }
    }
}
