import { Router, Request, Response } from 'express'
import { Types } from 'mongoose'
import { Element } from '../models/element'
import { verifyAuth } from '../controllers/authController'

export const testRouter = Router()

testRouter.get('/test', async (req: Request, res: Response) => {
	const newUserID = Types.ObjectId()

	// const element: any = await Element.find()
	res.send({ newUserID })
})

testRouter.post('/test',verifyAuth, async (req: Request, res: Response) => {
	// const user = req.user as String
	// console.log(user.substring(0, 2))
	console.log(req)
	// const element: any = await Element.find()
	// res.send({ element })
})