import { Router, Request, Response } from 'express'
import { Name } from '../models/name'

export const testRouter = Router()

testRouter.get('/test', async (req: Request, res: Response) => {
	const user = req.user as String
	console.log(user.substring(0, 2))

	res.send({ success: true })
})
