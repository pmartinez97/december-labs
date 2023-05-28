const Redis = require('redis');
const redisConfig = require('../config/redis')

const host = redisConfig.host || localhost;
const port = redisConfig.port  || 6379;

const url = `redis://${host}:${port}`;
const client = Redis.createClient({ url });

module.exports = client;