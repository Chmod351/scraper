import { config } from 'dotenv';
config();
export default {
  port: process.env.PORT,
  host: process.env.URL_SERVER,
  requestLimit: process.env.LIMIT,
  database: process.env.POSGRESQL_DATABASE,
  databaseUsername: process.env.POSGRESQL_USERNAME,
  databasePassword: process.env.POSGRESQL_PASSWORD,
};
