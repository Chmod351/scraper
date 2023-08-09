import mongoose from 'mongoose';
import envConfig from './envConfig.js';
const db = envConfig.database;
const server = mongoose;

const connect = () => {
  server
    .connect(db)
    .then(() => {
      console.log('connected to mongoose');
    })
    .catch((err) => {
      throw err;
    });
};

export default connect;
