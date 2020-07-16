import {app} from './app'
import { Socket } from 'socket.io'
const port = process.env.PORT || 5000


const server = app.listen(port, () => {
	console.log(`Running on ${port}`)
})
const io:Socket = require('socket.io').listen(server)
var user:String =""
io.on('connection', socket => {
  console.log('user connected')
  socket.on('joinRoom', (data: { room: any; user: any }) => {
    const {room,user} = data
    console.log(`${user} join ${room}`)
    socket.join(room);
  });

  socket.on('chatMessage', (data: { sender: any; message: any; room: any }) => {
    const {sender,message,room} = data
    let time = new Date().getTime()
    io.to(room).emit('message', {sender,message,time});
    const noti = {roomID:room,sender,message,time}
    io.emit('notify',noti)
  });
  socket.on('addHint',(data:{ reciever: any; hint:any;})=>{
    io.emit('update-hint',data)
  })
  // Runs when client disconnects
  socket.on('disconnect', () => {
      console.log(`user disconnected`)  
  }
  );
});