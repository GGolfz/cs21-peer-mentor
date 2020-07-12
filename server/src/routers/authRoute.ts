import passport from 'passport'
import { Router, Request, Response } from 'express'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { User } from '../models/user'

passport.use(
	new MicrosoftStrategy(
		{
			clientID: '7247cd65-5e8c-4114-a15f-a4538cf03bde',
			clientSecret: 'A-FwBepRC14lo~.-g98TuMf6O_J8-2t2Zf',
			callbackURL: 'http://localhost:3050/auth/microsoft/callback',
			scope: ['user.read']
		},
		function (
			accessToken: String,
			refreshToken: String,
			profile: any,
			done: Function
		) {
			// console.log(accessToken, refreshToken, profile)
			done(null, profile)
		}
	)
)

interface UserProp {
	provider: String
	name: {
		familyName: String
		givenName: String
	}
	id: String
	displayName: String
	emails: Array<Object>
}

export const authRoute = Router()

authRoute.get('/auth/microsoft', passport.authenticate('microsoft'))

authRoute.get(
	'/auth/microsoft/callback',
	passport.authenticate('microsoft', { session: true, failureRedirect: '/login' }),
	async (req: Request, res: Response) => {
		// Successful authentication, redirect home.
		if (req.user) {
			const user: any = req.user
			console.log(user)

			const existingUser = await User.findOne({
				student_id: user.name.givenName
			})
			if (!existingUser) {
				// TODOS
				// Add element
				// Test badges
				await User.create({
					student_id: user.name.givenName,
					email: user.emails[0].value,
					year: determineYear(user.name.givenName)
				})
			}
		}

		res.redirect('/test')
	}
)

const determineYear = (id: String): String => {
	const year = id.substring(0, 2)
	switch (year) {
		case '63':
			return '1'
		case '62':
			return '2'
		case '61':
			return '3'
		case '60':
			return '4'
		default:
			return 'Error'
	}
}
