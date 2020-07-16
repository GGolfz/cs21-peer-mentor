import { Request, Response } from 'express'
import { User } from '../models/user'
import { Room } from '../models/room'

export const getRoomListController = async (req: Request, res: Response): Promise<void> => {
	// const student_id = req.user
	const student_id = '62130500230'
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms = await Room.find({ member: user._id })
		.populate('member', { display_name: 1, profile_img: 1, _id: 0 })
		.select({ messages: 0 })

	res.send(rooms)
}
