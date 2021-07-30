'use strict';

const Postgresql = require('./postgresql');

// eslint-disable-next-line max-len
module.exports = new Postgresql(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/`);
