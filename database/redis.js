const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
   password: 'Rj5stSrBIh4UCSZbvHbDXemySxKgqyr4',
    socket: {
        host: 'redis-17216.c276.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17216
    }
});

module.exports = redisClient;