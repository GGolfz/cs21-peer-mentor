import * as express from 'express'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import { rateLimiterMiddleware } from "./rateLimiterRedis";

export const app: express.Application = express.default()


app.use(rateLimiterMiddleware)
app.use(bodyParser.json())
app.use(helmet())
