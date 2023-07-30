import cors from 'cors';
import config from '../config/envConfig.js';

const documentation = `${config.host}/api/docs`;
const host = config.host;
const applicationUrl = `${config.host}/api/public/html.html`;

export default cors({
  origin: [documentation, host, applicationUrl],
  allowedHeaders: 'Content-Type',
  methods: ['POST'],
});
