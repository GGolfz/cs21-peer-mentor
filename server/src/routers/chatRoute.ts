import { Router } from 'express'
import { getRoomListController } from '../controllers/chatController'

export const chatRouter = Router()

chatRouter.get('/rooms', getRoomListController)
