import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		res.redirect('/test')
		return
	}
	res.redirect('/')
}

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.user) {
		res.status(401).send({ error: 'User not authen' })
		return
	}
	const user = await User.findOne({ student_id: req.user })
	if (user == null) {
		res.status(404).send({ error: 'User not founded' })
		return
	}
	next()
}

export const passportCallback = async (accessToken: String, refreshToken: String, profile: any, done: Function) => {
	if (profile.name.familyName != 'SIT-STUDENT') {
		const error = 'Please sign-in using @ad.sit.kmutt.ac.th'
		done(error, null)
		return
	}
	const existingUser = await User.findOne({
		student_id: profile.name.givenName,
	})

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
