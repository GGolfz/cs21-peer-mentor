import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import { testRouter } from './routers/testRoute'
import { authRoute } from './routers/authRoute'
import { profileRoute } from './routers/profileRoute'
import { hintRoute } from './routers/hintRoute'
import { badgeRoute } from './routers/badgeRoute'
import { chatRouter } from './routers/chatRoute'
import { redis } from './util/redis'
import { rateLimiterMiddleware } from "./util/rateLimiterRedis";
const RedisStore = require('connect-redis')(session)
require('dotenv').config()

export const app: express.Application = express()

const connectionString =
	'mongodb://' +
	process.env.COSMOSDB_HOST +
	':' +
	process.env.COSMOSDB_PORT +
	'/' +
	process.env.COSMOSDB_DBNAME +
	'?ssl=true&replicaSet=globaldb&retrywrites=false'
mongoose
	.connect(connectionString, {
		auth: {
			user: process.env.COSMODDB_USER as string,
			password: process.env.COSMOSDB_PASSWORD as string,
		},
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Connection to CosmosDB successful'))
	.catch(err => console.error(err))

const corsOptions: cors.CorsOptions = {
	origin: [process.env.CLIENT_URL as string],
	methods: ['GET', 'POST', 'PUT', 'PATCH'],
	credentials: true,
}

passport.serializeUser((user, cb) => {
	cb(null, user)
})

passport.deserializeUser((obj, cb) => {
	cb(null, obj)
})

app.use(rateLimiterMiddleware)
app.use(
	session({
		store: new RedisStore({ client: redis }),
		secret: process.env.SESSION_SECRET as string,
		resave: true,
		saveUninitialized: true,
		// cookie: { maxAge: 3600000 }
	})
)

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(helmet())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(testRouter)
app.use(authRoute)
app.use(profileRoute)
app.use(hintRoute)
app.use(badgeRoute)
app.use(chatRouter)
