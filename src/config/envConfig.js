import { config } from 'dotenv';
config();
export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  document: process.env.URL_DOCS,
  host: process.env.SERVER,
  applicationUrl: process.env.SCRAPPER,
};
