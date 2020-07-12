import { Request, Response } from 'express'
import { User } from '../models/user'

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
	const userProfile = await User.findOne({ student_id: req.user })
	res.send(userProfile)
}
