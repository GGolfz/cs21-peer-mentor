import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getProfileController, newProfilePicController } from '../controllers/profileController'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export const profileRoute = Router()

profileRoute.get('/profile', verifyAuth, getProfileController)

profileRoute.post('/profilepic', upload.single('profile_pic'), newProfilePicController)
