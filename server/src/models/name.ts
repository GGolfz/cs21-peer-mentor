import { model, Schema } from 'mongoose'

const nameSchema = new Schema({
	student_id: String,
	name: String,
})

export const Name = model('name', nameSchema)
