import { Request, Response } from 'express'
import { User } from '../models/user'
import { Storage, UploadResponse } from '@google-cloud/storage'
import fs from 'fs'
import sharp from 'sharp'

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
	const student_id = req.user
	const userProfile = await User.findOne({ student_id }).populate('element')
	res.send(toProfileRes(userProfile))
}

interface profileResBody {
	display_name: String
	name: String
	profile_img: String
	bio: String
	year: String
	element: {
		name: String
		thai_name: String
		image_url: String
	}
}

interface updatedFields {
	bio: String
	display_name: String
}

export const updateProfileController = async (req: Request<{}, {}, updatedFields>, res: Response): Promise<void> => {
	const student_id = req.user
	if (!req.body.bio && !req.body.display_name) {
		res.status(400).send({ Error: 'Input is empty. Please includes' })
		return
	}

	const profile = await User.findOneAndUpdate(
		{ student_id },
		{
			bio: req.body.bio,
			display_name: req.body.display_name,
		},
		{
			new: true,
		}
	).populate('element')
	res.send(toProfileRes(profile))
}

export const newProfilePicController = async (req: Request, res: Response): Promise<void> => {
	// Verify the existing of a image file
	if (!req.file) {
		res.status(400).send({ error: 'Profile picture is not included' })
		return
	}
	const originalFilePath = `uploads/${req.file.filename}`
	const optimizedFilePath = `${originalFilePath}_1`

	const filetypeTest = /.*\.(jpeg|jpg|png)/i.test(req.file.originalname)

	if (filetypeTest == false) {
		fs.unlinkSync(originalFilePath)
		res.status(400).send({ error: 'File types is not valid' })
		return
	}
	try {
		// Optimize the image
		await sharp(originalFilePath)
			.resize({
				height: 400,
				width: 400,
			})
			.webp({})
			.toFile(optimizedFilePath)

		const student_id = req.user
		// const student_id = '62130500230' // Placeholder

		// Upload to Google Cloud Storage
		const storage = new Storage({ keyFilename: 'GCS-service-account.json' })
		const bucketName = 'cs21-peer-mentor'
		const gcsFile: UploadResponse = await storage.bucket(bucketName).upload(optimizedFilePath, {
			destination: `profile_img/${req.file.filename}.webp`,
			gzip: true,
		})

		const gcsFilePath = `https://storage.googleapis.com/cs21-peer-mentor/${gcsFile[0].name}`
		// Write image url to db
		const profile = await User.findOneAndUpdate(
			{ student_id },
			{ profile_img: gcsFilePath },
			{ new: true }
		).populate('element')
		res.status(201).send(toProfileRes(profile))
	} catch (err) {
		res.status(500).send({ error: err })
	}
	// Clean up the temp file
	fs.unlinkSync(originalFilePath)
	fs.unlinkSync(optimizedFilePath)
}

const toProfileRes = (profile: any): profileResBody => {
	return {
		display_name: profile.display_name,
		name: profile.name,
		profile_img: profile.profile_img,
		bio: profile.bio,
		year: profile.year,
		element: {
			name: profile.element.name,
			thai_name: profile.element.thai_name,
			image_url: profile.element.image_url,
		},
	}
}
