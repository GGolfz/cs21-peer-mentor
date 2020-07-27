import { RateLimiterRedis, IRateLimiterStoreOptions } from 'rate-limiter-flexible'
import { Request, Response, NextFunction } from "express";
import { redis } from './redis'

const limiterOption: IRateLimiterStoreOptions = {
    storeClient: redis,
    keyPrefix: 'limiter',
    points: 10,
    duration: 1,
    blockDuration: 3
}

const rateLimiter = new RateLimiterRedis(limiterOption)

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter.consume(req.ip)
      .then(() => {
        next()
      })
      .catch(() => {
        console.log(`${req.ip} is ddosing`)
        res.status(429).send('Slow down. Too many request la :3')
      })
}

