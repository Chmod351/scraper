import dbConfig from '../../config/serverConfig.js';
import { DataTypes } from 'sequelize';

const WebsiteTarget = dbConfig.server.define('WebsiteTarget', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cssClass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  scrapedTimes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default WebsiteTarget;
