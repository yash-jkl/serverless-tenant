import { getOsEnv, getOsEnvOptional } from './utils/env/env-extensions';

export const env = {
  db: {
    type: getOsEnv('DB_CONNECTION'),
    host: getOsEnvOptional('DB_HOST'),
    port: parseInt(getOsEnvOptional('DB_PORT')),
    username: getOsEnvOptional('DB_USERNAME'),
    password: getOsEnvOptional('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
  },
  tenant: {
    database: getOsEnv('TENANT_DATABASE'),
  },
};
