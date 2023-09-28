import { Module } from '@nestjs/common';
import { MainDatabaseService } from './main-database.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [DatabaseModule],
  providers: [MainDatabaseService, DatabaseService],
})
export class MainDatabaseModule {}
