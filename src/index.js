import path from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'https';

import app from './app';
import logger from './logger';
import { PORT, APP_URL, SSL_CERT_PATH, SSL_KEY_PATH } from './config';

const server = createServer(
  {
    cert: readFileSync(path.resolve(__dirname, '..', SSL_CERT_PATH)),
    key: readFileSync(path.resolve(__dirname, '..', SSL_KEY_PATH)),
  },
  app,
);

server.listen(PORT, () => {
  logger.info(`Listen on: ${APP_URL}:${PORT}`);
});
