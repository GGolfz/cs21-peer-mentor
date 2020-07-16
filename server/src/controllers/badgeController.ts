import { Request, Response } from 'express'
import { redis } from '../util/redis'
import crypto from 'crypto-js'
import { User } from '../models/user'
import { Room } from '../models/room'
import { Element } from '../models/element'
import { determineYear } from '../util/determineYear'

export const getTokenController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user as string
	// const student_id = '62130500226'
	try {
		const hashed = crypto.MD5(student_id).toString()
		let token = ''
		let unique = false
		while (!unique) {
			for (let i = 0; i < 5; i++) {
				const index = Math.random() * hashed.length
				token += hashed.charAt(index)
			}
			const cache = await redis.get(token)
			if (!cache) {
				unique = true
				break
			} else {
				token = ''
			}
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

interface newRoomSchema {
	type: String
	member: Array<any>
	messages: Array<any>
}

export const getNewBadgeController = async (req: Request<{}, {}, newBadgeReqBody>, res: Response): Promise<void> => {
	const student_id = req.user as String
	// const student_id = '62130500230'
	const year = determineYear(student_id)
	if (year != '1') {
		res.status(400).send({ error: 'Only first year student can get badge' })
		return
	}

	if (!req.body.token) {
		res.status(400).send({ error: 'Token from qrcode is required' })
		return
	}
	// Get target student_id from token
	const targetID = await redis.get(req.body.token)
	if (!targetID) {
		res.status(400).send({ error: 'Token is expired or never exist' })
		return
	}

	// Get the user
	const user: any = await User.findOne({ student_id }).populate('badges')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	if (!user.badges) user.badges = []

	// Check of element or year badge
	const targetYear = determineYear(targetID)
	let badge: any
	if (targetYear == '1') {
		badge = await Element.findOne({ member: targetID.substring(9) })
		if (!badge) {
			res.status(404).send({ error: 'Element is not found' })
			return
		}
	} else {
		badge = await Element.findOne({ name: { $regex: `${targetYear}$` } })
		if (!badge) {
			res.status(404).send({ error: 'Year is not found' })
			return
		}
	}
	// Check if user aleady own that element badge
	const isOwnedElement = addIfNotExistOnId(badge, user.badges)
	if (isOwnedElement) {
		await user.save()
	}

	// Create new chat room for user and target user
	const targetUser = await User.findOne({ student_id: targetID })
	const existingRoom = await Room.findOne({
		member: { $all: [user._id, targetUser?._id] },
		type: 'General'
	})
	if (!existingRoom) {
		const newRoom: newRoomSchema = {
			type: 'General',
			messages: [],
			member: [user, targetUser]
		}
		await Room.create(newRoom)
	}

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

const addIfNotExistOnId = (element: any, array: Array<any>): Array<any> | undefined => {
	let ownedElement = array.find((ele: any) => ele._id.toString() == element._id.toString())
	if (!ownedElement) {
		array.push(element)
		return array
	}
	return undefined
}
