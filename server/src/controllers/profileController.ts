import { Request, Response } from 'express'
import { User } from '../models/user'
import { Storage } from '@google-cloud/storage'
import fs from 'fs'

export const getProfileController = async (req: Request, res: Response): Promise<void> => {
	const userProfile = await User.findOne({ student_id: req.user })
	res.send(userProfile)
}

export const newProfilePicController = async (req: Request, res: Response): Promise<void> => {
	if (!req.file) {
		res.status(400).send({ error: 'Profile picture is not included' })
		return
	}
	const filetype = /(\.\w*)/.exec(req.file.originalname)

	if (filetype == null) {
		res.status(400).send({ error: 'File types is not specify' })
		return
	}
	// const student_id = req.user
	const student_id = 62130500230 // Placeholder

	// Upload to Google Cloud Storage
	const storage = new Storage({ keyFilename: 'GCS-service-account.json' })
	const bucketName = 'cs21-peer-mentor'
	const filepath = `uploads/${req.file.filename}`

	await storage.bucket(bucketName).upload(filepath, {
		destination: `profile_img/${student_id}${filetype[0]}`,
		gzip: true,
	})

	res.status(201).send({ success: true })

	fs.unlinkSync(filepath)
}
