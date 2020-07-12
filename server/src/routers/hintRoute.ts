import { Router } from 'express'
import { createHintController } from '../controllers/hintController'

export const hintRoute = Router()

hintRoute.post('/hint', createHintController)
