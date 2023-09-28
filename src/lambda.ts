import { Handler } from 'aws-lambda';
import { env } from './env';
import { MainDatabaseService } from './main-database/main-database.service';
import { TenantDataService } from './tenant-data/tenant-data.service';

export const handler: Handler = async (event: any) => {
  const data: {
    id: string;
  } = event;

  const [client, pod] = await new MainDatabaseService().getClientData(data);
  pod.name = env.tenant.database;
  const dataFromTenant = await new TenantDataService().getDataFromTenant(
    client,
    pod.name,
  );
  console.log('From tenant');
  console.log(dataFromTenant);
};
