import dbConfig from '../../config/serverConfig.js';
import { DataTypes } from 'sequelize';

const Result = dbConfig.server.define('Results', {
  content: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

export default Result;
