import Redis from 'ioredis'

export const redis = new Redis({
	host: 'cs21.redis.cache.windows.net',
	port: 6379,
	password: 'l+6jrO9kw6URmrKyOnr+n1DUm+FcPKdzgvqiG0KXVZw=',
})
