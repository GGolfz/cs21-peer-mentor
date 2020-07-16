import React, {useEffect,useState} from 'react'
import Router from 'next/router'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import ChatRoom from '../../components/chat/chatroom'
import socketIOClient from 'socket.io-client'
import {useRouter} from 'next/router'
let socket
function Chat({data}) {
  let temp = {
    room: "ยังคิดไม่ออก",
    me: 'b',
    member: [
        {
            name: "Wisarut",
            profile_image: "https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp"
        },
        {
            name: "b",
            profile_image: ""
        }
    ],
    messages:[
        {
            sender:"Wisarut",
            message:"หวัดดี",
            time:"12:00:00",
            seen:[
                "Wisarut","b"
            ]
        }
    ]
  }
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  const roomID = useRouter().query.room
  const [message,setMessage] = useState(temp.messages)
  const [notify,setNotify] = useState(0)
  
  //Implement Socket
  useEffect(() => {
    socket= socketIOClient("http://localhost:5000")
    socket.emit('joinRoom',{room:roomID,user:temp.me})
    socket.on('message', (messageNew) => {
      setMessage(message=> [...message,messageNew])
      var x= document.getElementById('chat-room')
      x.scrollTop = x.scrollHeight
      setNotify(notify=> notify+1)
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
      const tempData = {sender:temp.me,message,room:roomID}
      socket.emit('chatMessage', tempData)

    }
  }
  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year} hint={data.hint?data.hint:[]}/>
      <div className="content">
        <ChatRoom data={temp} messages={message} onSend={onSend}/>
      </div>
      <ControlBar notify={notify}/>
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
  if(ctx.req.headers.cookie){
    const res = await axios.get('/profile',{headers: { cookie: ctx.req.headers.cookie }})
    const data1 = await res.data
    const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
    const hint = await res3.data
    return { props: { data:{year:data1.year,hint:hint} }}
  }
  else{
    return { props: { data: {err:true}}}
  }

}

export default Chat;