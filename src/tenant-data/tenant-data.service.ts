import { Injectable } from '@nestjs/common';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { eventType } from '../utils/constants';

@Injectable()
export class TenantDataService {
    constructor(
        private readonly tenantService: TenantDatabaseService = new TenantDatabaseService(),
    ) { }

    async getDataFromTenant(data: any, name: string) {
        const toJson = JSON.stringify(data)
        const toObject = JSON.parse(toJson)
        const query =`INSERT INTO clients (id, name, timezone_id, currency_code, locale, business_summary, tagline, website, logo_url, phone_number, created_at, created_by, updated_at, updated_by, archived, archived_status_changed_at, active, active_status_changed_at, parent_id, address, long_term_goals) VALUES (${toObject.id? `'${toObject.id}'`: null}, ${toObject.name? `'${toObject.name}'`: null},${toObject.timezone_id? `'${toObject.timezone_id}'`: null},${toObject.currency_code? `'${toObject.currency_code}'`: null},${toObject.locale? `'${toObject.locale}'`: null},${toObject.business_summary? `'${toObject.business_summary}'`: null},${toObject.tagline? `'${toObject.tagline}'`: null},${toObject.website? `'${toObject.website}'`: null},${toObject.logo_url? `'${toObject.logo_url}'`: null},${toObject.phone_number? `'${toObject.phone_number}'`: null},${toObject.created_at? `'${toObject.created_at}'`: null},${toObject.created_by? `'${toObject.created_by}'`: null},${toObject.updated_at? `'${toObject.updated_at}'`: null},${toObject.updated_by? `'${toObject.updated_by}'`: null},${toObject.archived},${toObject.archived_status_changed_at? `'${toObject.archived_status_changed_at}'`: null},${toObject.active},${toObject.active_status_changed_at? `'${toObject.active_status_changed_at}'`: null},${toObject.parent_id? `'${toObject.parent_id}'`: null},'${JSON.stringify(toObject.address)}',${toObject.long_term_goals? `'${toObject.long_term_goals}'`: null} );` 
        
        try {
            const clients = await this.tenantService.query(
                name,
                query
            );
            return clients[0];
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}
