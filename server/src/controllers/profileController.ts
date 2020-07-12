import { Request, Response } from 'express'
import { User } from '../models/user'
import { Storage, UploadResponse } from '@google-cloud/storage'
import fs from 'fs'
import sharp from 'sharp'

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
	const userProfile = await User.findOne({ student_id: req.user })
	res.send(userProfile)
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
				height: 200,
				width: 200,
			})
			.webp()
			.toFile(optimizedFilePath)

		// const student_id = req.user
		const student_id = 62130500230 // Placeholder

		// Upload to Google Cloud Storage
		const storage = new Storage({ keyFilename: 'GCS-service-account.json' })
		const bucketName = 'cs21-peer-mentor'
		const gcsFile: UploadResponse = await storage.bucket(bucketName).upload(optimizedFilePath, {
			destination: `profile_img/${req.file.filename}.webp`,
			gzip: true,
		})

		const gcsFilePath = `https://storage.googleapis.com/cs21-peer-mentor/${gcsFile[0].name}`
		// Write image url to db
		await User.findOneAndUpdate({ student_id }, { profile_img: gcsFilePath })
		const profile = await User.findOne({ student_id })
		res.status(201).send(profile)
	} catch (err) {
		res.status(500).send({ error: err })
	}
	// Clean up the temp file
	fs.unlinkSync(originalFilePath)
	fs.unlinkSync(optimizedFilePath)
}
