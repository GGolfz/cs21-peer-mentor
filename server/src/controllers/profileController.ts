import { Request, Response } from 'express'
import { User } from '../models/user'

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
	const userProfile = await User.findOne({ student_id: req.user })
	res.send(userProfile)
}

export const updateProfileController = async (req: Request, res: Response): Promise<void> => {
	const fectedUser = await User.findOne({ student_id: req.user })
	if(!fectedUser) {
		res.status(404).send({"Error": "User not found."})
		return
	}

	//Temporarily checking 
	if(!req.body.bio && !req.body.name && !req.body.display_name) {
		res.status(400).send({"Error": "Input is empty. Please includes"})
	}

	await fectedUser.updateOne({
		bio: req.body.bio,
		name: req.body.name,
		display_name: req.body.display_name
	})

	await fectedUser.save()
	
	res.send(fectedUser)
}
