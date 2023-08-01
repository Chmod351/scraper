import { Sequelize } from 'sequelize';
import envConfig from './envConfig.js';

const server = new Sequelize(
  envConfig.database,
  envConfig.databaseUsername,
  envConfig.databasePassword,
  {
    host: envConfig.dattabaseHost,
    dialect: 'postgres',
  },
);

const testDbConnection = async () => {
  try {
    await server.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(error);
  }
};

const dbConfig = {
  server,
  testDbConnection,
};
export default dbConfig;
