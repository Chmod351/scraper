import dbConfig from '../../config/serverConfig.js';
import { DataTypes } from 'sequelize';

const Result = dbConfig.server.define('Results', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
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

Result.belongsTo(WebsiteTarget, {
  foreignKey: 'websiteTargetId',
});

Result.belongsToMany(ResultKeyword, {
  through: 'ResultResultKeyword',
  foreignKey: 'resultId',
  otherKey: 'resultKeywordId',
});

export default Result;
