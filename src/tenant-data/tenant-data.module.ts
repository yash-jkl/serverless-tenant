import { Module } from '@nestjs/common';
import { TenantDataService } from './tenant-data.service';
import { TenantDatabaseModule } from '../tenant-database/tenant-database.module';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';
import { ClientTableService } from './client-table/client-table.service';

@Module({
  imports: [TenantDatabaseModule],
  providers: [TenantDataService, TenantDatabaseService, ClientTableService],
})
export class TenantDataModule {}
