import React, {useEffect,useState} from 'react'
import Router from 'next/router'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import ChatRoom from '../../components/chat/chatroom'
import socketIOClient from 'socket.io-client'
let socket
function Chat({data}) {
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  const [message,setMessage] = useState(data.room?data.room.messages:[])
  const [roomdata,setRoomdata] = useState(data.room)
  const [notify,setNotify] = useState(0)
  const [hints,setHints] = useState(data.hint);
  
  //Implement Socket
  useEffect(() => {
    socket= socketIOClient(process.env.SOCKET_URL)
    socket.emit('joinRoom',{room:data.roomID,user:data._id})
    socket.on('message', (messageNew) => {
      setMessage([...message,messageNew])
      var x = document.getElementById('chat-room')
      x.scrollTop = x.scrollHeight
      if(messageNew.roomID !== data.roomID && messageNew.senderID !== data._id){
        setNotify(notify=> notify+1)
      }
    })
    socket.on('update-hint',(updated)=>{
      if(data.student_id === updated.reciever){
        setHints(updated.hint.reverse())
      }
    })
  }, []);
  useEffect(()=>{
    return ()=>{socket.emit('disconnect')}
  },[]);
  const onSend = (message)=>{
    if(message.length>0){
      let time = new Date().getTime()
      axios.post('/message',{message,roomID:data.roomID,timestamp:time}).then(
        res=> {
          setMessage(res.data.message)
          setRoomdata(res.data)
          const tempData = {sender:data.display_name,senderID:data._id,message,room:data.roomID,time}
          socket.emit('chatMessage', tempData)
        }
      ).catch(err=>{
        console.log(err)
      })
    }
  }
  const addHint = (newhint)=>{
    socket.emit('addHint',newhint)
  }
  const goTo = async (el)=>{
    await socket.emit('forceDisconnect')
    await Router.push(el.href)
  }
  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
      <div className="content">
        <ChatRoom data={roomdata} me={data._id} roomID={data.roomID} messages={message} onSend={onSend}/>
      </div>
      <ControlBar notify={notify} onGoto={goTo}/>
      <style jsx>{
          `
          @media only screen and (max-width:480px){
          .container {
              margin: 0%
          }
          }
          @media only screen and (max-width:1024px) and (min-width:481px){
              .container {
                margin:0% 25%;
              }
          }
          @media only screen and (min-width: 1025px) {
              .container {
                margin:0% 35%;
              }
          }
          .container {
            background:white;
            height:100vh;
          }
          .content {
            height:82vh !important;
            text-align:center;
          }
          `
        }</style>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  try{
    if(ctx.req.headers.cookie){
      const roomID = ctx.query.room
      const res = await axios.get('/profile',{headers: { cookie: ctx.req.headers.cookie }})
      const data1 = await res.data
      const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
      const hint = await res3.data
      const res2 = await axios.get(`/roomDetail?roomID=${roomID}`,{headers: { cookie: ctx.req.headers.cookie}})
      const data2 = await res2.data
      return { props: { data:{...data1,hint:hint.reverse(),room:data2,roomID} }}
    }
    else{
      return { props: { data: {err:true}}}
    }
  }
  catch(err){
    return {props: {data:{err:true}}}
  }
    

}

export default Chat;