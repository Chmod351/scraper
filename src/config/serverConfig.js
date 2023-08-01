import { Sequelize } from 'sequelize';
import envConfig from './envConfig.js';
const server = new Sequelize(
  envConfig.database,
  envConfig.databaseUsername,
  envConfig.databasePassword,
  {
    host: envConfig.host,
    dialect: 'postgres',
  },
);

export default server;
