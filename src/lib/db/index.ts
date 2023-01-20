import Postgresql from './postgresql';

const { POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER } = process.env;
export default new Postgresql(`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/`);

export { default as QueryCache } from './queryCache';
export { default as getPageResult } from './pageResult';
export * from './types';
