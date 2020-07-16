import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	message: String,
	timestamp: {
		type: Number
	},
	seen: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	]
})

const roomSchema = new Schema({
	name: String,
	type: String,
	member: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	messages: [messageSchema]
})

export const Room = model('room', roomSchema)
