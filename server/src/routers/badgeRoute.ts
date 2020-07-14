import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getQRController, getNewBadgeController } from '../controllers/badgeController'

export const badgeRoute = Router()

badgeRoute.get('/qr', getQRController)

badgeRoute.post('/badge', getNewBadgeController)
