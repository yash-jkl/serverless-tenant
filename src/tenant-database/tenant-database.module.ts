import { Module } from '@nestjs/common';
import { TenantDatabaseService } from './tenant-database.service';

@Module({
  providers: [TenantDatabaseService],
})
export class TenantDatabaseModule {}
