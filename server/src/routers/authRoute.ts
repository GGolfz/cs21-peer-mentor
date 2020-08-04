import passport from 'passport'
import { Router, NextFunction, Response, Request } from 'express'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { authCallbackController, passportCallback, logoutController, verifyAuth } from '../controllers/authController'
require('dotenv').config()

passport.use(
	new MicrosoftStrategy(
		{
			clientID: process.env.MSAPP_CLIENT_ID as string,
			clientSecret: process.env.MSAPP_CLIENT_SECRET as string,
			callbackURL: `${process.env.SERVER_URL}/auth/microsoft/callback`,
			scope: ['user.read']
		},
		passportCallback
	)
)

export const authRoute = Router()

authRoute.get('/auth/microsoft', passport.authenticate('microsoft'))

authRoute.get('/logout', verifyAuth, logoutController)


const errorHandler = (req: Request, res: Response, next: NextFunction) => {
	if(req.query.error){
		res.redirect(`${process.env.CLIENT_URL}/`)
	}
	else {
		next()
	}
}

authRoute.get(
	'/auth/microsoft/callback',
	errorHandler,
	passport.authenticate('microsoft', { session: true, failureRedirect: `${process.env.CLIENT_URL}` }),
	authCallbackController
)

