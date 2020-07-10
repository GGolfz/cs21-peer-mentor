import { Router, Request, Response } from 'express'

export const testRouter = Router()

testRouter.get('/test', (req: Request, res: Response) => {
	res.send({ success: true })
})
