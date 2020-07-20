import React, { useEffect,useState } from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import ShowProfile from '../../components/profile/show-profile'
import axios from '../../axios/axios'
import ProfileImg from '../../components/profile/edit-image'
import Router from 'next/router'
import QRCode from "react-qr-code";
import socketIOClient from 'socket.io-client'
let socket
const yearImage = {
  2:'https://storage.googleapis.com/cs21-peer-mentor/element_img/Sophomore.svg',
  3:'https://storage.googleapis.com/cs21-peer-mentor/element_img/Junior.svg',
  4:'https://storage.googleapis.com/cs21-peer-mentor/element_img/Senior.svg'
}
function Profile({data}) {
  const [notify,setNotify] = useState(data.notify)
  const [hints,setHints] = useState(data.hint);
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  // FOR IMPLEMENT SOCKET
  useEffect(() => {
    socket= socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL)
    socket.on('notify', (noti) => {
      let temp1 = [... data.rooms]
      temp1.map(room=> {
        if(room.roomID === noti.roomID && noti.senderID != data._id){
            setNotify(notify=> notify+1)
        }
      })
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
  useEffect(()=>{
    socket.on('notify')
  })
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
      <div className="screen">
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
          {
            !data.err && (
              <div className="content">
              <div className="inside-content" >
                <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>PROFILE</h1>
                <ProfileImg img={data.profile_img} />
                <ShowProfile img={data.year!=='1'?yearImage[parseInt(data.year)]:data.element.image_url} display={data.display_name} name={data.name} year={data.year} bio={data.bio}/>
              </div>
              <div className="qr-content">
              <QRCode size={100} level='L' value={data.token?data.token:""}/>
              <h2 style={{marginBottom:"0%",fontSize:"1.2em"}}>Code : {data.token}</h2>
              </div>
            </div>
            )
          }
      
      <ControlBar notify={notify} onGoto={goTo}/>
      </div>
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
          .screen {
            height:100% !important;
          }
          .container {
            background:white;
            height:100vh;
          }
          .inside-content{
            text-align:center;
            background: #FFFFFF;
          }
          .qr-content {
            margin-top: 4%;
            margin-bottom: 2%;
            padding: 4% 0%;
            background: #FFFFFF;
            text-align:center;
          }
          .content {
            height:82vh !important;
            text-align:center;
            background: #d4af5f44;
            overflow:auto;
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
      const res2 = await axios.get('/token',{headers: { cookie: ctx.req.headers.cookie }})
      const token1 = await res2.data
      const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
      const hint = await res3.data
      const res4 = await axios.get('/rooms',{headers: { cookie: ctx.req.headers.cookie}})
      const rooms = await res4.data
      const res5 = await axios.get('/notify',{headers: { cookie: ctx.req.headers.cookie}})
      const notify = await res5.data.notify
      const data = {...data1,token:token1.token,hint:hint,rooms,notify}
      return { props: { data } }
    }
    else{
      return { props: { data: {err:true}}}
    }
  }
  catch(err){
    return {props: {data:{err:true}}}
  }
    
}

export default Profile;