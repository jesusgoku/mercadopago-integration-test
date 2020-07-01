import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { configure } from 'nunjucks';

import routes from './routes';
import { NODE_ENV } from './config';

const isProduction = NODE_ENV === 'production';
const app = express();

configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  noCache: !isProduction,
  express: app,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

export default app;
