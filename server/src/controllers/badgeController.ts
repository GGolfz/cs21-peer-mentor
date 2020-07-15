import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { Element } from '../models/element'

// const sercre = process.env.JWT_SECRET
const secret = 'somesecret'

export const getTokenController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	// const student_id = '62130500216'

	const signedIDToken: String = jwt.sign({ student_id }, secret, {
		algorithm: 'HS256',
		expiresIn: '5m',
	})
	res.send({ token: signedIDToken })
}

interface newBadgeReqBody {
	token: string
}

export const getNewBadgeController = async (req: Request<{}, {}, newBadgeReqBody>, res: Response): Promise<void> => {
	const student_id = req.user
	// const student_id = '62130500230'
	if (!req.body.token) {
		res.status(400).send({ error: 'JWT from qrcode is required' })
		return
	}
	// Decode the token
	const decoded: any = jwt.verify(req.body.token, secret)

	// Get the user and element
	const user: any = await User.findOne({ student_id }).populate('badges')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	if (!user.badges) {
		user.badges = []
	}
	const element: any = await Element.findOne({ member: decoded.student_id.substring(9) })
	if (!element) {
		res.status(404).send({ error: 'Element is not found' })
		return
	}
	// Check if user aleady own that element badge
	let ownedElement = user.badges.find((ele: any) => ele._id.toString() == element._id.toString())
	if (!ownedElement) {
		user.badges.push(element)
		await user.save()
	} // TODO
	// What to return?
	res.status(201).send(user)
}

export const getBadgesController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	// const student_id = '62130500230'
	const user: any = await User.findOne({ student_id }, 'badges').populate('badges')
	if (!user) {
		res.send([])
		return
	}
	res.send(user.badges)
}
