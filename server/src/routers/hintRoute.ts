import { Router } from 'express'
import { verifyAuth } from '../controllers/authController'
import { createHintController, getHintController } from '../controllers/hintController'

export const hintRoute = Router()

hintRoute.post('/hint', verifyAuth, createHintController)

hintRoute.get('/hint', verifyAuth, getHintController)
