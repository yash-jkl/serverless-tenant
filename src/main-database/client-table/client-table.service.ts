import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { eventType } from '../../utils/constants';

@Injectable()
export class ClientTableService {
    constructor(
        private readonly databaseService: DatabaseService = new DatabaseService(),
    ) { }

    async getClientData(data: eventType) {
        let parents = null
        const ids = data.id
        try {
            const clients = await this.databaseService.query(
                `select * from clients where id in ('${ids}');`,
            );
            if (clients[0].parent_id) {
                parents = await this.getparentData(clients[0].parent_id)
            }
            return {
                clients,
                parents
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getparentData(parentId) {
        return await this.databaseService.query(
            `select * from clients where id in ('${parentId}');`,
        );
    }
}
