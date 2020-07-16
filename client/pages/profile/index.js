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
function Profile({data}) {
  const [notify,setNotify] = useState(0)
  const [hints,setHints] = useState(data.hint);
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  // FOR IMPLEMENT SOCKET
  useEffect(() => {
    socket= socketIOClient("http://localhost:5000")
    socket.on('notify', () => {
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
  useEffect(()=>{
    socket.on('notify')
  })
  const addHint = (newhint)=>{
    socket.emit('addHint',newhint)
  }



  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
          {
            !data.err && (
              <div className="content">
              <div className="inside-content" >
                <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>PROFILE</h1>
                <ProfileImg img={data.profile_img} />
                <ShowProfile img={data.element.image_url} display={data.display_name} name={data.name} year={data.year} bio={data.bio}/>
              </div>
              <div className="qr-content">
              <QRCode size={128} level='L' value={data.token?data.token:""}/>
              <h2 style={{marginBottom:"0%"}}>Code : {data.token}</h2>
              </div>
            </div>
            )
          }
      
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
          .inside-content{
            text-align:center;
            background: #FFFFFF;
          }
          .qr-content {
            margin-top: 6%;
            padding: 4% 0%;
            background: #FFFFFF;
            text-align:center;
          }
          .content {
            height:82vh !important;
            text-align:center;
            background: #d4af5f44;
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
      const data = {...data1,token:token1.token,hint:hint}
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