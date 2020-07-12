import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { profile } from 'console'
import { getProfileController, newProfilePicController, updateProfileController } from '../controllers/profileController'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export const profileRoute = Router()

profileRoute.get('/profile', verifyAuth, getProfileController)

profileRoute.get('/profile/updated', verifyAuth, updateProfileController)

profileRoute.post('/profilepic', upload.single('profile_pic'), newProfilePicController)
