import { Router } from 'express'
import { 
    createHintController, 
    getHintByOwnerController,
    getHintByRecieverController
} 
    from '../controllers/hintController'

export const hintRoute = Router()

hintRoute.post('/hint', createHintController)

hintRoute.get('/hint/reciever', getHintByRecieverController)

hintRoute.get('/hint/owner', getHintByOwnerController)
