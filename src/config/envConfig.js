import { config } from 'dotenv';
config();
export default {
  port: process.env.PORT,
  host: process.env.URL_SERVER,
  requestLimit: process.env.LIMIT,
};
