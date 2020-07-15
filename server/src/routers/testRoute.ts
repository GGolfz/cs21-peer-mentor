import { Router, Request, Response } from 'express'
import { Element } from '../models/element'

export const testRouter = Router()

testRouter.get('/test', async (req: Request, res: Response) => {
	// const user = req.user as String
	// console.log(user.substring(0, 2))

	const element: any = await Element.find()
	res.send({ element })
})
