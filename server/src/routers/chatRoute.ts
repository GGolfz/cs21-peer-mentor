import { Router } from 'express'
import { getRoomListController, getRoomDetailController, updateRoomMessage, getCurrentNotify, updateNotify } from '../controllers/chatController'
import { verifyAuth } from '../controllers/authController'

export const chatRouter = Router()

chatRouter.get('/rooms', verifyAuth,getRoomListController)
chatRouter.get('/roomDetail',verifyAuth,getRoomDetailController)
chatRouter.post('/message',verifyAuth,updateRoomMessage)
chatRouter.get('/notify',verifyAuth,getCurrentNotify)
chatRouter.patch('/notify',verifyAuth,updateNotify)