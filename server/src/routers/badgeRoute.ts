import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getTokenController, getNewBadgeController, getBadgesController } from '../controllers/badgeController'

export const badgeRoute = Router()

badgeRoute.get('/token', getTokenController)

badgeRoute.post('/badge', getNewBadgeController)

badgeRoute.get('/badge', verifyAuth, getBadgesController)
