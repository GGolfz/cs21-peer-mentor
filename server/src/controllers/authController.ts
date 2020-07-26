import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { User } from '../models/user'
import { Name } from '../models/name'
import { Room } from '../models/room'
import { Element } from '../models/element'
import { determineYear } from '../util/determineYear'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		res.redirect(`${process.env.CLIENT_URL}/authsuccess`)
		// res.send('<script>window.close()</script>')
		return
	}
	res.redirect(process.env.CLIENT_URL as string)
}

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.user) {
		res.status(401).send({ error: 'User not authen' })
		return
	}
	// const user = await User.findOne({ student_id: req.user })
	// if (user == null) {
	// 	res.status(404).send({ error: 'User not founded' })
	// 	return
	// }
	next()
}

export const logoutController = (req: Request, res: Response): void => {
	req.logout()
	res.redirect(process.env.CLIENT_URL as string)
}

interface UserAttributes {
	_id: Types.ObjectId
	student_id: String
	email: String
	year: String
	name: String
	display_name: String
	bio: String
	profile_img: String
	element: String
	// rooms: Array<any>
}

export const passportCallback = async (accessToken: String, refreshToken: String, profile: any, done: Function) => {
	const email = profile.emails[0].value
	// Check if the account is a SIT Student account
	if (!/.*@mail.kmutt.ac.th/.test(email)) {
		const error = 'Please sign-in using @mail.kmutt.ac.th'
		done(error, null)
		return
	}

	// Check if the use is not new
	const name: String = profile.displayName
	const existingUser: any = await User.findOne({ "name" : { $regex: `${name}`, $options: 'i' }})
	let student_id
	// If use is new
	if (!existingUser) {
		// Get student_id form names collection
		const nameResult: any = await Name.findOne({ "name" : { $regex: `${name}`, $options: 'i' }})
		student_id = nameResult.student_id
		if(!nameResult){
			done(`${student_id} is not found in names collection`, null)
			return
		}
		// Determine the year and element of the user
		const year = determineYear(student_id)
		const element: any = await Element.findOne({ member: student_id.substring(9) })
		if (!element) {
			done(`Element for ${student_id} is not found`, null)
			return
		}
		// Create new user
		const newUserID = Types.ObjectId()
		const firstname = /(\w*) (\w*)/.exec(name as string)
		if (!firstname) {
			done(`${name} cannot pass the name regex`, null)
			return
		}
		// User init rooms for new user
		await Room.updateMany(
			{ $or: [{ name: `Code Line ${student_id.substring(9)}` }, { name: `${element.name} Code Line` }] },
			{ $push: { member: newUserID } }
		)

		const newUser: UserAttributes = {
			_id: newUserID,
			student_id,
			email,
			year,
			name,
			display_name: firstname[1],
			bio: '',
			profile_img: `https://storage.googleapis.com/cs21-peer-mentor/profile_img/default_profile_img.jpeg`,
			element: element._id
			// rooms: []
		}
		await User.create(newUser)
	}
	else {
		student_id = existingUser.student_id
	}
	done(null, student_id)
}
