import { Sequelize } from 'sequelize';
import envConfig from './envConfig';
const server = new Sequelize('scrapper', 'username', 'password', {
  host: envConfig.API_URL,
  dialect: 'postgres',
});

export default server;
