import { Request, Response } from 'express'
import { User } from '../models/user'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		const user: any = req.user
		// console.log(user)
		if (user.name.familyName != 'SIT-STUDENT') {
			res.redirect('/')
			return
		}

		const existingUser = await User.findOne({
			student_id: user.name.givenName,
		})
		if (!existingUser) {
			// TODOS
			// Add element
			// Test badges
			await User.create({
				student_id: user.name.givenName,
				email: user.emails[0].value,
				year: determineYear(user.name.givenName),
			})
		}
		req.user = user.name.givenName
	}

	res.redirect('/test')
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
