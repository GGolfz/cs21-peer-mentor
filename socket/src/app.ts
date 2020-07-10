import * as express from 'express'
import * as bodyParser from 'body-parser'
import { testRouter } from './routers/testRoute'
export const app:express.Application = express.default()

app.use(bodyParser.json())
app.use(testRouter)