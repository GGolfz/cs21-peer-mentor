import { Schema, model } from 'mongoose'

const hintSchema = new Schema({
	owner: String,
	reciever: String,
	messange: String,
	created_at: {
		type: Schema.Types.Date,
		default: new Date()
	},
	seen: {
		type: Boolean,
		default: false
	}
})

export const Hint = model('hint', hintSchema)
