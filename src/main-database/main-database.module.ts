import { Module } from '@nestjs/common';
import { MainDatabaseService } from './main-database.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { ClientTableService } from './client-table/client-table.service';
import { PodsService } from './pods/pods.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    MainDatabaseService,
    DatabaseService,
    ClientTableService,
    PodsService,
  ],
})
export class MainDatabaseModule {}
