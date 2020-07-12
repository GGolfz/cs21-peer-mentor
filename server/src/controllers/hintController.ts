import { Request, Response } from 'express'
import { Hint } from '../models/hint'
import { BoolEnum } from 'sharp'

interface newHintReqBody {
	message: String
}

interface HintResBody {
	message: String
	created_at: Date
	seen: BoolEnum
}

export const createHintController = async (req: Request<{}, {}, newHintReqBody>, res: Response): Promise<void> => {
	// const owner = req.user
	const owner = '62130500230'
	const reciever = '63' + owner.substring(2)

	if (!req.body.message) {
		res.status(400).send({ error: 'Message is required' })
		return
	}

	await Hint.create({
		owner,
		reciever,
		message: req.body.message
	})

	const hints = await Hint.find({ owner, reciever })
	res.status(201).send(hints)
}
