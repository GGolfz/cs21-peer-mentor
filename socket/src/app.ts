import * as express from 'express'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
export const app: express.Application = express.default()

app.use(bodyParser.json())
app.use(helmet())
