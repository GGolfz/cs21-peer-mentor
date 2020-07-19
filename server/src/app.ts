import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import cors from 'cors'
import { testRouter } from './routers/testRoute'
import { authRoute } from './routers/authRoute'
import { profileRoute } from './routers/profileRoute'
import { hintRoute } from './routers/hintRoute'
import { badgeRoute } from './routers/badgeRoute'
import { chatRouter } from './routers/chatRoute'
import { redis } from "./util/redis";
const RedisStore = require('connect-redis')(session)

export const app: express.Application = express()

const connectionString = process.env.MONGO_CONNECTION_STRING as string
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

const corsOptions: cors.CorsOptions = {
	origin: [process.env.CLIENT_URL as string],
	methods: ['GET', 'POST', 'PUT', 'PATCH'],
	credentials: true
}

passport.serializeUser((user, cb) => {
	cb(null, user)
})

passport.deserializeUser((obj, cb) => {
	cb(null, obj)
})

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
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(testRouter)
app.use(authRoute)
app.use(profileRoute)
app.use(hintRoute)
app.use(badgeRoute)
app.use(chatRouter)
