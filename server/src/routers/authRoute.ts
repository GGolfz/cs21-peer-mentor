import passport from 'passport'
import { Router } from 'express'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { authCallbackController, passportCallback, logoutController, verifyAuth } from '../controllers/authController'

passport.use(
	new MicrosoftStrategy(
		{
			clientID: '7247cd65-5e8c-4114-a15f-a4538cf03bde',
			clientSecret: 'A-FwBepRC14lo~.-g98TuMf6O_J8-2t2Zf',
			callbackURL: 'http://localhost:3050/auth/microsoft/callback',
			scope: ['user.read'],
		},
		passportCallback
	)
)

export const authRoute = Router()

authRoute.get('/auth/microsoft', passport.authenticate('microsoft'))

authRoute.get('/logout', verifyAuth, logoutController)

authRoute.get(
	'/auth/microsoft/callback',
	passport.authenticate('microsoft', { session: true, failureRedirect: '/login' }),
	authCallbackController
)
