import { Request, Response } from 'express'
import { redis } from '../util/redis'
import crypto from 'crypto-js'
import { User } from '../models/user'
import { Element } from '../models/element'

// const sercre = process.env.JWT_SECRET

export const getTokenController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user as string
	// const student_id = '62130500212'
	try {
		const hashed = crypto.MD5(student_id).toString()
		let token = ''
		for (let i = 0; i < 5; i++) {
			const index = Math.random() * hashed.length
			token += hashed.charAt(index)
		}
		await redis.setex(token, 300, student_id)
		res.send({ token })
	} catch (err) {
		res.status(500).send(err)
	}
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
	const targetID = await redis.get(req.body.token)
	if (!targetID) {
		res.status(400).send({ error: 'Token is expired or never exist' })
		return
	}

	// Get the user and element
	const user: any = await User.findOne({ student_id }).populate('badges')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	if (!user.badges) {
		user.badges = []
	}
	const element: any = await Element.findOne({ member: targetID.substring(9) })
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
