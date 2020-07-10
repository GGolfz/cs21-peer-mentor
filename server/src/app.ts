import express from 'express'
import bodyParser from 'body-parser'
import { testRouter } from './routers/testRoute'

export const app = express()

app.use(bodyParser.json())
app.use(testRouter)
