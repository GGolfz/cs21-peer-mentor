import * as express from 'express'
import * as bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import { testRouter } from './routers/testRoute'
import { authRoute } from './routers/authRoute'
export const app: express.Application = express.default()

const connectionString = `mongodb+srv://node-api:m42J1btjwCqRdlCp@cluster0.z5cnc.mongodb.net/cs21PeerMentor?retryWrites=true&w=majority`
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

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
		cookie: { maxAge: 3600000 }
	})
)

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(testRouter)
app.use(authRoute)
