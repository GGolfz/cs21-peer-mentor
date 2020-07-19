import { Router } from 'express'
import { getRoomListController, getRoomDetailController, updateRoomMessage, getCurrentNotify, updateNotify, updateRoomDetail } from '../controllers/chatController'
import { verifyAuth } from '../controllers/authController'

export const chatRouter = Router()

chatRouter.get('/rooms', verifyAuth,getRoomListController)
chatRouter.get('/roomDetail',verifyAuth,getRoomDetailController)
chatRouter.patch('/updateRoomDetail',verifyAuth,updateRoomDetail)
chatRouter.post('/message',verifyAuth,updateRoomMessage)
chatRouter.get('/notify',verifyAuth,getCurrentNotify)
chatRouter.patch('/notify',verifyAuth,updateNotify)