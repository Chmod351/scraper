import cors from 'cors';

import config from '../config/envConfig';
const documentation = config.document;
const host = config.host;
const applicationUrl = config.applicationUrl;

export default cors({
  origin: [documentation, host, applicationUrl],
  allowedHeaders: 'Content-Type',
  methods: ['GET'],
});
