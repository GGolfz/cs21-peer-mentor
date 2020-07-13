import { Router } from 'express'
import { createHintController, getHintController } from '../controllers/hintController'

export const hintRoute = Router()

hintRoute.post('/hint', createHintController)

hintRoute.get('/hint', getHintController)
