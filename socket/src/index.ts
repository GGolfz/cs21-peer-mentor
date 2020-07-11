import {app} from './app'
import { Server } from 'http'
import { Socket } from 'socket.io'
const port = process.env.PORT || 5000


const server = app.listen(port, () => {
	console.log(`Running on ${port}`)
})
const io:Socket = require('socket.io').listen(server)
var user:String =""
io.on('connection', socket => {
  console.log('user connected')
  socket.on('joinRoom', (data: { room: any; username: any }) => {
    const {room,username} = data
    user = username
    console.log(`${username} join ${room}`)
    socket.join(room);
  });

  socket.on('chatMessage', (data: { username: any; message: any; room: any }) => {
    const {username,message,room} = data
    console.log(data)
    io.to(room).emit('message', `${username}: ${message}`);
    const noti = {roomID:room,username,message}
    io.emit('notify',noti)
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    if (user.length > 0 ){
      console.log(`${user} disconnected`)  
    }
  }
  );
});