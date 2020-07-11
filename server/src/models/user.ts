import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	student_id: String,
	email: String,
	full_name: String,
	display_name: String,
	bio: String,
	profile_img: String,
	year: String,
	token: String,
	element: {
		type: Schema.Types.ObjectId,
		ref: 'element'
	},
	hints: [
		{
			type: Schema.Types.ObjectId,
			ref: 'hint'
		}
	],
	badges: [
		{
			type: Schema.Types.ObjectId,
			ref: 'element'
		}
	]
})

export const User = model('user', userSchema)
