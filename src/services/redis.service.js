const Redis = require('redis');

const host = process.env.REDIS_HOST || localhost;
const port = process.env.REDIS_PORT || 6379;

const url = `redis://${host}:${port}`;
const client = Redis.createClient({ url });

module.exports = client;