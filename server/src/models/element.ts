import { Schema, model } from 'mongoose'

const elementSchema = new Schema({
	name: String,
	thai_name: String,
	image_url: String,
	member: [String],
})

export const Element = model('element', elementSchema)
