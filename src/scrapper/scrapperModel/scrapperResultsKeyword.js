import { DataTypes } from 'sequelize';
import dbConfig from '../config/serverConfig.js';

const ResultKeyword = dbConfig.server.define('ResultKeyword', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  scrapedTimes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

ResultKeyword.belongsToMany(Result, {
  through: 'ResultResultKeyword',
  foreignKey: 'resultKeywordId',
  otherKey: 'resultId',
});

ResultKeyword.belongsToMany(Keyword, {
  through: 'ResultKeywordKeyword',
  foreignKey: 'resultKeywordId',
  otherKey: 'keywordId',
});

export default ResultKeyword;
