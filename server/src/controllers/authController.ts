import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import { Element } from '../models/element'

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

interface UserAttributes {
	student_id: String
	email: String
	year: String
	name: String
	display_name: String
	bio: String
	profile_img: String
	element: String
}

export const passportCallback = async (accessToken: String, refreshToken: String, profile: any, done: Function) => {
	if (profile.name.familyName != 'SIT-STUDENT') {
		const error = 'Please sign-in using @ad.sit.kmutt.ac.th'
		done(error, null)
		return
	}
	const student_id: String = profile.name.givenName
	const existingUser = await User.findOne({ student_id })

	if (!existingUser) {
		const year = determineYear(student_id)
		const element = await Element.findOne({ member: student_id.substring(9) })
		if (!element) {
			done(`Element for ${student_id} is not found`, null)
			return
		}
		const newUser: UserAttributes = {
			student_id,
			email: profile.emails[0].value,
			year,
			name: '',
			display_name: '',
			bio: '',
			profile_img: '',
			element: element._id,
		}
		// TODOS
		console.log(newUser)
		// Test badges
		await User.create(newUser)
	}

	done(null, student_id)
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
