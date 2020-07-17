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

  socket.on('chatMessage', (data: { sender: any;senderID: any; message: any; room: any; time: any; }) => {
    const {senderID,sender,message,room,time} = data
    console.log(data)
    io.emit('notify',{senderID,sender,message,time,roomID:room})
    io.to(room).emit('message', {senderID,sender,message,time,roomID:room});
  });
  socket.on('addHint',(data:{ reciever: any; hint:any;})=>{
    io.emit('update-hint',data)
  })
  // Runs when client disconnects
  socket.on('forceDisconnect',()=>{
    socket.disconnect();
  })
  socket.on('disconnect', () => {
      console.log(`user disconnected`)  
  }
  );
});