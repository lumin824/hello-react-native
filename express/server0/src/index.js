import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use('/api', require('./router/api'));

app.listen(process.env.SERVER_PORT || 7070);
