import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getProfileController, updateProfileController } from '../controllers/profileController'
import { profile } from 'console'

export const profileRoute = Router()

profileRoute.get('/profile', verifyAuth, getProfileController)

profileRoute.get('/profile/updated', updateProfileController)
