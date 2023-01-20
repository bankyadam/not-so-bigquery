// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import startServer from './server';

const port: number = parseInt(process.env.PORT, 10) || 8080;
const hostname: string = process.env.HOSTNAME || '0.0.0.0';
startServer(port, hostname);
