import {app} from './app'
import { Server } from 'http'
const port = process.env.PORT || 5000


const server = app.listen(port, () => {
	console.log(`Running on ${port}`)
})
const io:Server = require('socket.io').listen(server)
io.on('connection', socket => {
    console.log('user connected')
    socket.on('sent-message', (data:string) => {
      console.log(data)
      io.emit('new-message',data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
  })