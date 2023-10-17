export type eventType = {
  body: [
    {
      type: string,
      id: string
    }
  ]
}

export type Database = {
  DB_USERNAME: string;
  DB_HOST: string;
  DB_DATABASE: string;
  DB_PASSWORD: string;
  DB_PORT: number;
};
