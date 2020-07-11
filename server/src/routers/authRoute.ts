import passport from 'passport'
import { Router, Request, Response } from 'express'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'

passport.use(
	new MicrosoftStrategy(
		{
			clientID: '7247cd65-5e8c-4114-a15f-a4538cf03bde',
			clientSecret: 'A-FwBepRC14lo~.-g98TuMf6O_J8-2t2Zf',
			callbackURL: 'http://localhost:3050/auth/microsoft/callback',
			scope: ['user.read']
		},
		function (accessToken: any, refreshToken: any, profile: any, done: any) {
			// console.log(accessToken, refreshToken, profile)
			done(null, profile)
		}
	)
)

export const authRoute = Router()

authRoute.get('/auth/microsoft', passport.authenticate('microsoft'))

authRoute.get(
	'/auth/microsoft/callback',
	passport.authenticate('microsoft', { session: true, failureRedirect: '/login' }),
	(req: Request, res: Response) => {
		// Successful authentication, redirect home.
		console.log(req.user)

		res.redirect('/test')
	}
)
