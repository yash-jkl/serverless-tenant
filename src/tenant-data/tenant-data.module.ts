import { Module } from '@nestjs/common';
import { TenantDataService } from './tenant-data.service';
import { TenantDatabaseModule } from '../tenant-database/tenant-database.module';
import { TenantDatabaseService } from '../tenant-database/tenant-database.service';

@Module({
  imports: [TenantDatabaseModule],
  providers: [TenantDataService, TenantDatabaseService],
})
export class TenantDataModule {}
