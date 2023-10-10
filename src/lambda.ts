import { Handler } from 'aws-lambda';
import { MainDatabaseService } from './main-database/main-database.service';
import { TenantDataService } from './tenant-data/tenant-data.service';
import { AwsSecrets } from './utils/aws-services/aws-secrets';

export const handler: Handler = async (event: any) => {
  const data: {
    id: string;
  } = event;
  try {
    const [client, pod] = await new MainDatabaseService().getClientData(data);
    const secret = await new AwsSecrets().getSecrets();
    const clientDbConnection = JSON.parse(secret[pod[0].pg_sql_db_key_name]);
    const clientDb = await new TenantDataService().getDataFromTenant(
      client,
      clientDbConnection,
    );
    clientDb.release();
  } catch (error) {
    console.log(error);
  }
};
