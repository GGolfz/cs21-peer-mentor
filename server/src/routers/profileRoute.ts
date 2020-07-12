import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getProfileController } from '../controllers/profileController'

export const profileRoute = Router()

profileRoute.get('/profile', verifyAuth, getProfileController)
