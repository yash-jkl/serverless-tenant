export const mockClient = {
  id: '1d6ebaa2-fe05-4251-b7d7-a8741ad39447',
  name: 'RMS North America LLC',
  timezone_id: 'America/Los_Angeles',
  currency_code: null,
  locale: null,
  business_summary: null,
  tagline: null,
  website: null,
  address: {
    city: 'San Diego',
    state: 'CA',
    postalCode: '92121',
    addressLine1: '6155 Cournerstone Court East, Suite 110',
    addressLine2: 'null, null',
  },
  long_term_goals: null,
  logo_url: null,
  phone_number: null,
  parent_id: 'e8450b4c-0b2d-465c-a7be-c3ae04f23563',
  created_at: '2023-06-21T19:31:03.121Z',
  created_by: null,
  updated_at: '2023-09-26T00:35:05.472Z',
  updated_by: null,
  archived: false,
  archived_status_changed_at: null,
  active: true,
  active_status_changed_at: null,
  type: null,
  theme_color: null,
  domain_name: null,
  on_board: null,
  url_slug: null,
};

export const mockPod = [
  {
    id: '632c29c0-721e-4564-9ae8-84b610716f10',
    snowflake_db_key_name: 'tggHubSnowflakeDbKeyName',
    pg_sql_db_key_name: 'tggHubPgSqlDbKeyName',
    redis_key_name: 'tggHubRedisKeyName',
  },
];

export const mockSecret = {
  tggHubPgSqlDbKeyName:
    '{ "DB_HOST": "localhost",     "DB_PORT": "5432",     "DB_USERNAME": "postgres",     "DB_PASSWORD": "1234!",     "DB_DATABASE": "tggdb1" }',
};

export const mockDatabase = {
  DB_USERNAME: 'Posgres',
  DB_HOST: 'localhost',
  DB_DATABASE: 'abc',
  DB_PASSWORD: '12345',
  DB_PORT: 5432,
};

export const mockClientData = {
  id: '1d6ebaa2-fe05-4251-b7d7-a8741ad39447',
  name: 'RMS North America LLC',
  timezone_id: 'America/Los_Angeles',
  currency_code: null,
  locale: null,
  business_summary: null,
  tagline: null,
  website: null,
  address: {
    city: 'San Diego',
    state: 'CA',
    postalCode: '92121',
    addressLine1: '6155 Cournerstone Court East, Suite 110',
    addressLine2: 'null, null',
  },
  long_term_goals: null,
  logo_url: null,
  phone_number: null,
  parent_id: 'e8450b4c-0b2d-465c-a7be-c3ae04f23563',
  created_at: '2023-06-21T19:31:03.121Z',
  created_by: null,
  updated_at: '2023-09-26T00:35:05.472Z',
  updated_by: null,
  archived: false,
  archived_status_changed_at: null,
  active: true,
  active_status_changed_at: null,
  type: null,
  theme_color: null,
  domain_name: null,
  on_board: null,
  url_slug: null,
};

export const mockParentData = {
  id: 'e8450b4c-0b2d-465c-a7be-c3ae04f23563',
  name: 'TGG',
  timezone_id: 'America/Los_Angeles',
  currency_code: null,
  locale: null,
  business_summary: null,
  tagline: null,
  website: 'https://hub-dev.tgg-accounting.com/',
  address: null,
  long_term_goals: null,
  logo_url: null,
  phone_number: '123456789',
  parent_id: null,
  created_at: '2023-07 - 31T06:01: 33.722Z',
  created_by: '0faf8e69-935f-466c-a58c-5b059b477c9b',
  updated_at: '2023 -09 - 25T07: 25: 47.686Z',
  updated_by: '42293ee5-257e-422c-a450-a4c5f342f0f3',
  archived: false,
  archived_status_changed_at: null,
  active: true,
  active_status_changed_at: null,
  type: 'agency',
  theme_color: null,
  domain_name: null,
  on_board: true,
  url_slug: 'tggHub',
};

export const mockClientFinancialProfiles = {
  id: '05d2d769-a2f8-4845-add8-c965733ff286',
  financial_year: 'specific-month',
  calendar: 'February',
  entity_type_id: 'fc25e6dd-cf77-49a1-99a6-0b2d1331db3b',
  tax_basis_type_id: 'a8afcfac-17ca-4f1f-8067-c39f44ebf4c9',
  state_id: '85e359cf-a902-4011-b4c4-bbc640b8bb80',
};

export const mockParentGetData = {
  rows: [
    {
      id: 'e8450b4c-0b2d-465c-a7be-c3ae04f23563',
      name: 'TGG',
      timezone_id: 'America/Los_Angeles',
      currency_code: null,
      locale: null,
      business_summary: null,
      tagline: null,
      website: 'https://hub-dev.tgg-accounting.com/',
      address: null,
      long_term_goals: null,
      logo_url: null,
      phone_number: '123456789',
      parent_id: null,
      created_at: '2023-07 - 31T06:01: 33.722Z',
      created_by: '0faf8e69-935f-466c-a58c-5b059b477c9b',
      updated_at: '2023 -09 - 25T07: 25: 47.686Z',
      updated_by: '42293ee5-257e-422c-a450-a4c5f342f0f3',
      archived: false,
      archived_status_changed_at: null,
      active: true,
      active_status_changed_at: null,
      type: 'agency',
      theme_color: null,
      domain_name: null,
      on_board: true,
      url_slug: 'tggHub',
    },
  ],
};

export type eventType = {
  body: [
    {
      type: string,
      id: string
    }
  ]
}