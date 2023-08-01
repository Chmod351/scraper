import { DataTypes } from 'sequelize';
import server from '../config/serverConfig.js';

const ScrapedData = server.define('ScrapedData', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  containerClass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keyword: {
    type: DataTypes.STRING,
  },
  scanDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  articles: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  scanCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default ScrapedData;
