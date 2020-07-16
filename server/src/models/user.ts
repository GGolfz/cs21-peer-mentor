import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	student_id: String,
	email: String,
	name: String,
	display_name: String,
	bio: String,
	profile_img: String,
	year: String,
	token: String,
	element: {
		type: Schema.Types.ObjectId,
		ref: 'element'
	},
	badges: [
		{
			type: Schema.Types.ObjectId,
			ref: 'element'
		}
	],
	created_at: {
		type: Date,
		default: new Date()
	}
	// rooms: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'room'
	// 	}
	// ]
})

export const User = model('user', userSchema)
