import { Router, Request, Response } from 'express'

export const testRouter = Router()

testRouter.get('/test', (req: Request, res: Response) => {
	const user = req.user as String
	console.log(user)
	console.log(typeof user)
	console.log(user.substring(0, 2))

	res.send({ success: true })
})
