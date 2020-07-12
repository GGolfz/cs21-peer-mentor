import { Request, Response } from 'express'
import { User } from '../models/user'

export const authCallbackController = async (req: Request, res: Response): Promise<void> => {
	if (req.user) {
		res.redirect('/test')
		return
	}
	res.redirect('/')
}
