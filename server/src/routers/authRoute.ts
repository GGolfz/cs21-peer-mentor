import passport from 'passport'
import { Router, Request, Response } from 'express'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { authCallbackController } from '../controllers/authController'
import { User } from '../models/user'

passport.use(
	new MicrosoftStrategy(
		{
			clientID: '7247cd65-5e8c-4114-a15f-a4538cf03bde',
			clientSecret: 'A-FwBepRC14lo~.-g98TuMf6O_J8-2t2Zf',
			callbackURL: 'http://localhost:3050/auth/microsoft/callback',
			scope: ['user.read'],
		},
		async function (accessToken: String, refreshToken: String, profile: any, done: Function) {
			// console.log(accessToken, refreshToken, profile)
			const existingUser = await User.findOne({
				student_id: profile.name.givenName,
			})
			console.log(profile)
			if (!existingUser) {
				// TODOS
				// Add element
				// Test badges
				await User.create({
					student_id: profile.name.givenName,
					email: profile.emails[0].value,
					year: determineYear(profile.name.givenName),
					name: '',
					display_name: '',
					bio: '',
					profile_img: '',
				})
			}

			done(null, profile.name.givenName)
		}
	)
)

export const authRoute = Router()

authRoute.get('/auth/microsoft', passport.authenticate('microsoft'))

authRoute.get(
	'/auth/microsoft/callback',
	passport.authenticate('microsoft', { session: true, failureRedirect: '/login' }),
	authCallbackController
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
