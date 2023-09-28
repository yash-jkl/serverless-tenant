import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UtilsModule } from './utils/utils.module';
import { MainDatabaseModule } from './main-database/main-database.module';
import { TenantDatabaseModule } from './tenant-database/tenant-database.module';
import { TenantDataModule } from './tenant-data/tenant-data.module';

@Module({
  imports: [
    DatabaseModule,
    UtilsModule,
    MainDatabaseModule,
    TenantDatabaseModule,
    TenantDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
