import cors from 'cors';

export default cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
  methods: ['POST'],
});
