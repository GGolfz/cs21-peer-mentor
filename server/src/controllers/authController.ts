import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import { Name } from '../models/name'
import { Element } from '../models/element'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		// res.redirect('/profile')
		res.redirect('http://localhost:3000/profile')
		return
	}
	res.redirect('http://localhost:3000')
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
	// Check if the account is a SIT Student account
	if (profile.name.familyName != 'SIT-STUDENT') {
		const error = 'Please sign-in using @ad.sit.kmutt.ac.th'
		done(error, null)
		return
	}
	// Check if the use is not new
	const student_id: String = profile.name.givenName
	const existingUser = await User.findOne({ student_id })

	// If use is new
	if (!existingUser) {
		// Determine the year and element of the user
		const year = determineYear(student_id)
		const element = await Element.findOne({ member: student_id.substring(9) })
		if (!element) {
			done(`Element for ${student_id} is not found`, null)
			return
		}
		// Get the user's name from 'names' collection
		const match_name: any = await Name.findOne({ student_id })
		if (!match_name) {
			done(`${student_id} is not found in names collection`, null)
			return
		}
		// Create new user
		const firstname = /(\w*).(\w*) (\w*)/.exec(match_name.name)
		if (!firstname) {
			done(`${match_name.name} cannot pass the regex`, null)
			return
		}
		const newUser: UserAttributes = {
			student_id,
			email: profile.emails[0].value,
			year,
			name: match_name.name,
			display_name: firstname[2],
			bio: '',
			profile_img: '',
			element: element._id
		}
		// TODOS
		// Test badges
		console.log(newUser)
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
