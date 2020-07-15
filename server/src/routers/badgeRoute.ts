import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { getTokenController, getNewBadgeController, getBadgesController } from '../controllers/badgeController'

export const badgeRoute = Router()

badgeRoute.get('/token', verifyAuth, getTokenController)

badgeRoute.post('/badge', verifyAuth, getNewBadgeController)

badgeRoute.get('/badge', verifyAuth, getBadgesController)
