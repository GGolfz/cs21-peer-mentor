import { Request, Response } from 'express'
import { Hint } from '../models/hint'

interface newHintReqBody {
	message: String
}

interface HintResBody {
	message: String
	created_at: Date
	seen: Boolean
}

export const createHintController = async (req: Request<{}, {}, newHintReqBody>, res: Response): Promise<void> => {
	const owner = req.user as String
	// const owner = '62130500216'
	const reciever = '63' + owner.substring(2)

	if (owner.substring(0, 2) != '62') {
		res.status(400).send({ error: 'Only 62 student can create a hint' })
		return
	}

	if (!req.body.message) {
		res.status(400).send({ error: 'Message is required' })
		return
	}

	await Hint.create({
		owner,
		reciever,
		message: req.body.message,
	})

	const hints = await Hint.find({ owner, reciever })
	res.status(201).send(hints)
}

export const getHintController = async (req: Request, res: Response): Promise<void> => {
	const user = req.user as String
	// const user = '62130500230'
	const yearNumber = user.substring(0, 2)
	let hints
	if (yearNumber == '63') {
		hints = await Hint.find({ reciever: user })
	} else if (yearNumber == '62') {
		hints = await Hint.find({ owner: user })
	} else {
		res.status(400).send({ error: 'No hint allow for other year' })
		return
	}
	res.send(toHintRes(hints))
}
export const updateHintController = async (req:Request,res:Response): Promise<void> => {
	const user = req.user as String
	const yearNumber = user.substring(0, 2)
	let hints
	if (yearNumber == '63') {
		await Hint.updateMany({ reciever: user },{seen:true},{new:true})
		hints = await Hint.find({ reciever: user })
	} else {
		res.status(400).send({ error: 'Cannot update seen' })
		return
	}
	res.send(toHintRes(hints))
}
const toHintRes = (hints: Array<any>): Array<HintResBody> => {
	const arr: Array<HintResBody> = []
	hints.forEach(ele => {
		arr.push({
			message: ele.message,
			created_at: ele.created_at,
			seen: ele.seen,
		})
	})
	return arr
}
