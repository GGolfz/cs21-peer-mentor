import { Router } from 'express'
import { getQRController } from '../controllers/badgeController'

export const badgeRoute = Router()

badgeRoute.get('/qr', getQRController)
