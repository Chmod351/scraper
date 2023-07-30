import { Sequelize } from 'sequelize';
import envConfig from './envConfig';
const server = new Sequelize('scrapper', 'username', 'password', {
  host: envConfig.host,
  dialect: 'postgres',
});

export default server;
