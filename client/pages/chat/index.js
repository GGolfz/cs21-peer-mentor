import React, {useEffect,useState} from 'react'
import Router from 'next/router'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import ChatBox from '../../components/chat/chatbox'
import socketIOClient from 'socket.io-client'
let socket
let temp = [{
            roomID:"1",
            name:"GGolfz",
            bio:"Just a lazy guy",
            time:"20:00",
            profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp",
            latest:"เบื่อ",
            sender:"Wisarut",
            notify:3,
            me: "b"
          },{
            roomID:"2",
            name:"GGolfz",
            bio:"Just a lazy guy",
            time:"20:00",
            profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp",
            latest:"เบื่อ",
            sender:"Wisarut",
            notify:3,
            me: "b"
          },{
            roomID:"3",
            name:"GGolfz",
            bio:"Just a lazy guy",
            sender:"b",
            time:"20:00",
            profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp",
            latest:"เบื่อ",
            notify:3,
            me: "b"
          },
        ]

function Chat({data}) {
  const [rooms,setRooms] = useState(data.rooms);
  const [hints,setHints] = useState(data.hint);
  const [notify,setNotify] = useState(data.notify)
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  useEffect(() => {
    socket= socketIOClient(process.env.SOCKET_URL)
  }, []);
  useEffect(()=>{

    socket.on('notify', (noti) => {
      let temp1 = [...rooms]
      temp1.map(room=> {
        if(room.roomID === noti.roomID){
          if(noti.senderID != data._id){
            room.notify += 1
            room.sender = noti.sender
            setNotify(notify=> notify+1)
          }
          else{
            room.sender = "You"
          }
          room.time = noti.time
          room.latest = noti.message
        }
      })
      setRooms(temp1)
    })
  },[]);
  useEffect(()=>{

    socket.on('update-hint',(updated)=>{
      if(data.student_id === updated.reciever){
        setHints(updated.hint.reverse())
      }
    })
  },[]);
  useEffect(()=>{
    return ()=>{socket.emit('disconnect')}
  },[]);
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
        <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>CHAT</h1>
        <div className="chat-list">
          {
            rooms && rooms.map((room)=>{
              return (<ChatBox key={room.roomID} data={room}/>)
            })
          }
        </div>
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
          .chat-list {
            height:90%;
            overflow-y: auto;

          }
          `
        }</style>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  try{
    if(ctx.req.headers.cookie){
      const res = await axios.get('/profile',{headers: { cookie: ctx.req.headers.cookie }})
      const data1 = await res.data
      const res1 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
      const hint = await res1.data
      const res2 = await axios.get('/rooms',{headers: { cookie: ctx.req.headers.cookie}})
      const rooms = await res2.data
      const res3 = await axios.get('/notify',{headers: { cookie: ctx.req.headers.cookie}})
      const notify = await res3.data.notify
      return { props: { data:{...data1,hint:hint.reverse(),rooms,notify} }}
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