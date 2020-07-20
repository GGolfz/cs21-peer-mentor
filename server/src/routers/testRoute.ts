import { Router, Request, Response } from 'express'
import { Types } from 'mongoose'
import { Room } from '../models/room'
import { Element } from '../models/element'
import { Hint } from '../models/hint'
import { User  } from '../models/user'
import { verifyAuth } from '../controllers/authController'
export const testRouter = Router()

testRouter.get('/test', async (req: Request, res: Response) => {
	// const newUserID = Types.ObjectId()
	const elements: any = await Element.find({})
	// console.log(process.env.TEST)
	res.send(elements)
})

testRouter.post('/test', verifyAuth, async (req: Request, res: Response) => {
	// const user = req.user as String
	// console.log(user.substring(0, 2))
	console.log(req)
	// const element: any = await Element.find()
	// res.send({ element })
})
