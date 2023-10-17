import { Handler } from 'aws-lambda';
import { MainDatabaseService } from './main-database/main-database.service';
import { TenantDataService } from './tenant-data/tenant-data.service';
import { AwsSecrets } from './utils/aws-services/aws-secrets';
import { eventType } from './utils/constants';

export const handler: Handler = async (event: any) => {
  const data: eventType = event;
  try {
    const { clients, getClientFinancialProfiles, parents, credential } =
      await new MainDatabaseService().getClientData(data);
    const secret = await new AwsSecrets().getSecrets();
    const clientDbConnection = JSON.parse(
      secret[credential.pg_sql_db_key_name],
    );
    await new TenantDataService().getDataFromTenant(
      clients,
      getClientFinancialProfiles,
      parents,
      clientDbConnection,
    );
  } catch (error) {
    console.log(error);
  }
};
