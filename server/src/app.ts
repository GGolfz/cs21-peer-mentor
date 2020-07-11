import * as express from 'express'
import * as bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import { testRouter } from './routers/testRoute'
import { authRoute } from './routers/authRoute'
export const app: express.Application = express.default()

passport.serializeUser((user, cb) => {
	cb(null, user)
})

passport.deserializeUser((obj, cb) => {
	cb(null, obj)
})

app.use(
	session({
		// store: new RedisStore({ client: redisClient }),
		secret: 'foobar',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 3600000 },
	})
)

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(testRouter)
app.use(authRoute)
