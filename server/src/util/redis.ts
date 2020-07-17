import Redis from 'ioredis'

export const redis = new Redis({
	host: process.env.REDIS_HOST,
	port: 6379,
	password: process.env.REDIS_PASSWORD
})
