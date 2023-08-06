import { DataTypes } from 'sequelize';
import dbConfig from '../../config/serverConfig.js';

const ResultKeyword = dbConfig.server.define('ResultKeyword', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  scrapedTimes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  relatedResults: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

ResultKeyword.prototype.addResultKeyword = async function(resultKeyword) {
  this.resultKeywordId = resultKeyword.id;
  await this.save();
};
export default ResultKeyword;
