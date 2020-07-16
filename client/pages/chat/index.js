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
            sender:"a",
            notify:3
          },{
            roomID:"2",
            name:"GGolfz",
            bio:"Just a lazy guy",
            time:"20:00",
            profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp",
            latest:"เบื่อ",
            sender:"a",
            notify:3
          },{
            roomID:"3",
            name:"GGolfz",
            bio:"Just a lazy guy",
            sender:"b",
            time:"20:00",
            profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp",
            latest:"เบื่อ",
            notify:3
          },
        ]

function Chat({data}) {
  const [rooms,setRooms] = useState(temp);
  const [hints,setHints] = useState(data.hint);
  const [notify,setNotify] = useState(0)
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  useEffect(() => {
    socket= socketIOClient("http://localhost:5000")
    socket.on('notify', (notify) => {
      let temp1 = [...rooms]
      temp1.map(room=> {
        if(room.roomID === notify.roomID){
          room.notify += 1
          room.time = notify.time
          room.sender = notify.sender
          room.latest = notify.message
        }
      })
      setRooms(temp1)
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
  const addHint = (newhint)=>{
    console.log(newhint)
    socket.emit('addHint',newhint)
  }
  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
      <div className="content">
        <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>CHAT</h1>
        <div className="chat-list">
          {
            rooms.map((room)=>{
              return (<ChatBox key={room.roomID} data={room}/>)
            })
          }
        </div>
        </div>
      <ControlBar/>
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
  if(ctx.req.headers.cookie){
    const res = await axios.get('/profile',{headers: { cookie: ctx.req.headers.cookie }})
    const data1 = await res.data
    const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
    const hint = await res3.data

    return { props: { data:{...data1,hint:hint.reverse()} }}
  }
  else{
    return { props: { data: {err:true}}}
  }

}

export default Chat;