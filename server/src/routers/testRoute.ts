import { Router, Request, Response } from 'express'
import { Types } from 'mongoose'
import { Element } from '../models/element'

export const testRouter = Router()

testRouter.get('/test', async (req: Request, res: Response) => {
	const newUserID = Types.ObjectId()

	// const element: any = await Element.find()
	res.send({ newUserID })
})
