import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		res.redirect('/test')
		return
	}
	res.redirect('/')
}

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.user) {
		res.status(401).send({ error: 'User not authen' })
		return
	}
	const user = await User.findOne({ student_id: req.user })
	if (user == null) {
		res.status(404).send({ error: 'User not founded' })
		return
	}
	next()
}
