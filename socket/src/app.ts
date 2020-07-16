import * as express from 'express'
import * as bodyParser from 'body-parser'
export const app:express.Application = express.default()

app.use(bodyParser.json())