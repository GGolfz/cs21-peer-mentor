import React, {useEffect} from 'react'
import Router from 'next/router'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import ChatBox from '../../components/chat/chatbox'
import ChatRoom from '../../components/chat/chatroom'
function Chat({data}) {
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year} hint={data.hint?data.hint:[]}/>
      <div className="content">
        {/* <ChatBox data={Object.assign({name:"GGolfz",bio:"Just a lazy guy",time:"20:00",profile_image:"https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp"},{latest:"เบื่อ",notify:"3"})}/> */}
        <ChatRoom />
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