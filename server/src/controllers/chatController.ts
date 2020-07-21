import { Request, Response } from 'express'
import { User } from '../models/user'
import { Room } from '../models/room'
import { Element } from '../models/element'
interface Message {
	message: String
	sender: String
	time: Number
}
interface Member {
	_id: String
	display_name: String
	profile_image: String
	bio: String
	name: String
	year: String
}
interface ChatBoxResponse {
	roomID: String
	name: String
	bio: String
	type: String
	time: Number
	profile_image: String
	latest: String
	sender: String
	notify: Number
}
export const getCurrentNotify = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms = await Room.find({ member: user._id })
	res.send(getNotify(rooms, user._id))
	return
}
export const updateRoomDetail = async (req:Request, res: Response): Promise<void> => {
	const student_id = req.user
	const roomID = req.body.roomID
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms = await Room.find({ member: user._id, _id: roomID })
	await rooms.forEach(async (room: any) => {
		room.messages.map((mes: any) => {
			if (!mes.seen.find((el: any) => el.toString() == user._id.toString())) {
				mes.seen.push(user._id)
			}
		})
		await room.save()
	})
	const rooms2: any = await Room.findOne({ member: user._id, _id: roomID  }).populate('member', {
		display_name: 1,
		bio: 1,
		profile_img: 1,
		_id: 1,
		year: 1,
	})
	const response = await roomDetailResponse(rooms2, user._id)
	res.send(response)
	return

}
export const updateRoomMessage = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	const roomID = req.body.roomID
	const message = req.body.message
	const timestamp = req.body.timestamp
	if (!roomID && !message) {
		res.status(400).send({ error: 'roomID and message are required' })
		return
	}
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	let newMessage = {
		sender: user._id,
		message: message,
		timestamp: Number(timestamp),
		seen: [user._id],
	}
	const rooms = await Room.findOneAndUpdate(
		{ _id: roomID, member: user._id },
		{ $push: { messages: newMessage } },
		{ new: true }
	)
	const rooms1 = await Room.find({ member: user._id, _id: roomID })
	await rooms1.forEach(async (room: any) => {
		room.messages.map((mes: any) => {
			if (!mes.seen.find((el: any) => el.toString() == user._id.toString())) {
				mes.seen.push(user._id)
			}
		})
		await room.save()
	})
	const rooms2: any = await Room.findOne({ member: user._id, _id: roomID  }).populate('member', {
		display_name: 1,
		bio: 1,
		profile_img: 1,
		_id: 1,
		year: 1,
	})
	const response = await roomDetailResponse(rooms2, user._id)
	res.send(response)
	return
}
export const getRoomDetailController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	// const student_id = '62130500230'
	const roomID = req.query.roomID
	if (!roomID) {
		res.status(400).send({ error: 'Room is required' })
		return
	}
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms = await Room.findOne({ _id: roomID, member: user._id }).populate('member', {
		display_name: 1,
		bio: 1,
		profile_img: 1,
		_id: 1,
		year: 1,
	})
	const response = await roomDetailResponse(rooms, user._id)
	res.send(response)
	return
}
export const updateNotify = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	const roomID = req.body.roomID
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms = await Room.find({ member: user._id, _id: roomID })
	rooms.forEach((room: any) => {
		room.messages.map((mes: any) => {
			if (!mes.seen.find((el: any) => el.toString() == user._id.toString())) {
				mes.seen.push(user._id)
			}
		})
		room.save()
	})
	const roomsRes = await Room.find({ member: user._id })
	res.send(getNotify(roomsRes, user._id))
	return
}
export const getRoomListController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	// const student_id = '62130500230'
	const user = await User.findOne({ student_id }).select('_id')
	if (!user) {
		res.status(404).send({ error: 'User is not found' })
		return
	}
	const rooms: any = await Room.find({ member: user._id }).populate('member', {
		display_name: 1,
		bio: 1,
		profile_img: 1,
		_id: 1,
		year: 1,
	})
	let response = await roomResponse(rooms, user._id.toString())
	res.send(response)
}
const getNotify = (rooms: Array<any>, me: any): Object => {
	let notify = 0
	rooms.map(room => {
		room.messages.forEach((message: any) => {
			if (!message.seen.find((see: any) => see == me.toString())) {
				notify += 1
			}
		})
	})
	return { notify }
}
const toRefMember = async (mem1: any, type: String): Promise<Member> => {
	if (type === 'General') {
		return {
			_id: mem1._id,
			display_name: mem1.display_name,
			profile_image: mem1.profile_img,
			bio: mem1.bio,
			name: mem1.name,
			year: mem1.year,
		}
	} else {
		let img = await getImage(`${mem1.year}`, 'user')
		return {
			_id: mem1._id,
			display_name: mem1.year !== '1' ? `พี่ปี ${mem1.year}` : mem1.display_name,
			profile_image: mem1.year !== '1' ? img : mem1.profile_img,
			bio: mem1.year !== '1' ? 'รอน้องๆ ตามหาอยู่น้า' : mem1.bio,
			name: mem1.year !== '1' ? `พี่ปี ${mem1.year}` : mem1.name,
			year: mem1.year,
		}
	}
}
const getMember = async (mem: any, type: any): Promise<Member> => {
	let member = await User.findOne({ _id: '' + mem }).select({
		display_name: 1,
		profile_img: 1,
		bio: 1,
		name: 1,
		year: 1,
	})
	return toRefMember(member, type)
}
const toRefRoomMembers = async (room: any): Promise<Array<Member>> => {
	const members: Array<Member> = []
	for (let i of room.member) {
		let res1 = await getMember(i._id, room.type)
		members.push(res1)
	}
	return members
}
const toRefRoomMessages = async (room: any, me: String): Promise<any> => {
	const messages: Array<Message> = []
	for (let message of room.messages) {
		if (room.type === 'General') {
			let sender
			if (message.sender.toString() == me.toString()) {
				sender = 'You'
			} else {
				sender = await room.member.find((mem: any) => mem._id.toString() == message.sender.toString())
					.display_name
			}
			await messages.push({
				message: message.message,
				sender,
				time: message.timestamp,
			})
		} else {
			let sender
			if (message.sender.toString() == me.toString()) {
				sender = 'You'
			} else {
				let mem1 = room.member.find((mem: any) => mem._id === message.sender.toString())
				sender = mem1.year !== '1' ? `พี่ปี ${mem1.year}` : mem1.display_name
			}
			await messages.push({
				message: message.message,
				sender,
				time: message.timestamp,
			})
		}
	}
	return messages
}
const roomDetailResponse = async (room: any, me: String): Promise<any> => {
	const member = await toRefRoomMembers(room)
	const messages = await toRefRoomMessages(room, me)
	return {
		_id: room._id,
		name: room.name,
		type: room.type,
		messages,
		member,
	}
}
const roomResponse = async (rooms: Array<any>, me: String): Promise<Array<ChatBoxResponse>> => {
	const arr: Array<ChatBoxResponse> = []
	for (let room of rooms) {
		let chatroom
		if (room.type === 'General') {
			let target = room.member.find((mem: any) => mem._id.toString() !== me)
			let lastMessage
			if (room.messages.length > 0) {
				let mes = room.messages[room.messages.length - 1]
				let sender
				if (mes.sender.toString() === me.toString()) {
					sender = 'You'
				} else {
					sender = room.member.find((mem: any) => mem._id.toString() === mes.sender.toString()).display_name
				}
				lastMessage = { message: mes.message, sender, timestamp: mes.timestamp }
			} else {
				lastMessage = { message: '', sender: '', timestamp: '' }
			}
			let notify = 0
			room.messages.forEach((message: any) => {
				if (!message.seen.find((see: any) => see == me.toString())) {
					notify += 1
				}
			})
			chatroom = {
				roomID: room._id,
				name: target ? target.display_name : '',
				bio: target ? target.bio : '',
				type: room.type,
				profile_image: target ? target.profile_img : '',
				time: lastMessage.timestamp,
				latest: lastMessage.message,
				sender: lastMessage.sender,
				notify: notify,
			}
		} else {
			let lastMessage
			if (room.messages.length > 0) {
				let mes = room.messages[room.messages.length - 1]
				let sender
				if (mes.sender.toString() == me.toString()) {
					sender = 'You'
				} else {
					let mem1 = room.member.find((mem: any) => mem._id.toString() == mes.sender.toString())
					sender = mem1.year !== '1' ? `พี่ปี ${mem1.year}` : mem1.display_name
				}
				lastMessage = { message: mes.message, sender, timestamp: mes.timestamp }
			} else {
				lastMessage = { message: '', sender: '', timestamp: '' }
			}
			let notify = 0
			room.messages.forEach((message: any) => {
				if (!message.seen.find((see: any) => see == me.toString())) {
					notify += 1
				}
			})
			let img = await getImage(room.name, room.type)
			chatroom = {
				roomID: room._id,
				name: room.name,
				bio: '',
				type: room.type,
				profile_image: img,
				time: lastMessage.timestamp,
				latest: lastMessage.message,
				sender: lastMessage.sender,
				notify: notify,
			}
		}
		arr.push(chatroom)
	}
	await arr.sort((a: any, b: any) => b.time - a.time)
	return arr
}
const getImage = async (name: String, type: String): Promise<String> => {
	switch (type) {
		case 'Co Line':
			const coimage: any = await Element.findOne({
				name: name.split(' ')[0],
			}).select('image_url')
			return coimage.image_url
		case 'Code Line':
			const codeimage: any = await Element.findOne({
				member: name.split(' ')[2],
			}).select('image_url')
			return codeimage.image_url
		case 'user':
			let ele_name = name == '2'? "Sophomore": (name == '3'? "Junior": "Senior")
			const userimage: any = await Element.findOne({
				name: `${ele_name}`,
			}).select('image_url')
			return userimage.image_url
	}
	return ''
}