import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import {
	getProfileController,
	newProfilePicController,
	updateProfileController,
} from '../controllers/profileController'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export const profileRoute = Router()

profileRoute.get('/profile', verifyAuth, getProfileController)

profileRoute.patch('/profile', verifyAuth, updateProfileController)

profileRoute.post('/profilepic', verifyAuth, upload.single('profile_pic'), newProfilePicController)
