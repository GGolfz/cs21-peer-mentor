import { Schema, model } from 'mongoose'

const hintSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	reciever: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	messange: String
})

export const Hint = model('hint', hintSchema)
