import React, {useEffect,useState} from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import Router from 'next/router'
import {Row,Col} from 'antd'
import socketIOClient from 'socket.io-client'
let socket
const badgeList = 
[{
  "name": "Fire",
  "thai_name": "ไฟ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Fire%20Logo.svg",
  "member": ["06", "10", "25", "45", "70"],
  "check": false
},
{
  "name": "Thunderbolt",
  "thai_name": "สายฟ้า",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Thunder%20Logo.svg",
  "member": ["22", "46", "48", "50", "53"],
  "check": false
},
{
  "name": "Water",
  "thai_name": "น้ำ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Water%20Logo.svg",
  "member": ["14", "19", "20", "39", "51", "59", "71"],
  "check": false
},
{
  "name": "Earth",
  "thai_name": "ดิน",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Soil%20Logo.svg",
  "member": ["01", "08", "16", "52"],
  "check": false
},
{
  "name": "Wind",
  "thai_name": "ลม",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Wind%20Logo.svg",
  "member": ["23", "43", "54", "56", "57", "63", "67"],
  "check": false
},
{
  "name": "Darkness",
  "thai_name": "ความมืด",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Dark%20Logo.svg",
  "member": ["03", "41", "42", "55", "60", "64"],
  "check": false
},
{
  "name": "Wolf",
  "thai_name": "หมาป่า",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Wolf%20Logo.svg",
  "member": ["17", "29", "33", "35"],
  "check": false
},
{
  "name": "Sun",
  "thai_name": "พระอาทิตย์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Sun%20Logo.svg",
  "member": ["09", "11", "27"],
  "check": false

},
{
  "name": "Moon",
  "thai_name": "พระจันทร์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Moon%20Logo.svg",
  "member": ["07", "21", "30", "38", "75"],
  "check": false
},
{
  "name": "Star",
  "thai_name": "ดาว",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Star%20Logo.svg",
  "member": ["34", "44", "61"],
  "check": false
},
{
  "name": "Vampire",
  "thai_name": "แวมไพร์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Vampire%20Logo.svg",
  "member": ["02", "26", "28", "49", "72", "74"],
  "check": false
},
{
  "name": "Gem",
  "thai_name": "อัญมณี",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Gem%20Logo.svg",
  "member": ["05", "37", "58"],
  "check": false
},
{
  "name": "Forest",
  "thai_name": "ป่า",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Forest%20Logo.svg",
  "member": ["13", "15", "18", "24", "40", "65", "66"],
  "check": false
},
{
  "name": "Dimension",
  "thai_name": "มิติ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Dimension%20Logo.svg",
  "member": ["32", "36", "47", "62", "68"],
  "check": false
},
{
  "name": "Cat-lover",
  "thai_name": "ธาตุแมว",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Cat%20Logo.svg",
  "member": ["04", "12", "31"],
  "check": false
},
{ 
  "name":"Year 2",
  "image_url":"https://storage.googleapis.com/cs21-peer-mentor/element_img/Sophomore.svg",
  "check": false
},
{
  "name":"Year 3",
  "image_url":"https://storage.googleapis.com/cs21-peer-mentor/element_img/Junior.svg",
  "check": false
},
{
  "name":"Year 4",
  "image_url":"https://storage.googleapis.com/cs21-peer-mentor/element_img/Senior.svg",
  "check": false
}
]
let have = new Set()
function Badge({data}) {
  const [notify,setNotify] = useState(0)
  const [hints,setHints] = useState(data.hint);
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
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
    data.badge && data.badge.map(el=>{
      have.add(el.name)
    })
    badgeList.map(el=>{
      if(have.has(el.name)){
        el.check = true
      }
    })
    badgeList.sort((a,b)=> false - a.check) 
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
      <div className="screen">
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
      <div className="content">
      <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>BADGE</h1>
        <Row className="badge-list">
        {
          badgeList.map((el,index)=>{
            if(el.check){
              return (<Col key={el.name} span={8}><img src={el.image_url} width="100%"/>{el.name}</Col>)
            }
            return (<Col key={el.name} span={8}><img src={el.image_url} width="100%" style={{filter:"grayscale(1)",opacity:'0.3'}}/>{el.name}</Col>)
          })
        }
        </Row>
      </div>
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
          .content {
            height:82vh !important;
            text-align:center;
          }
          :global(.badge-list) {
            height:75vh;
            overflow-x:auto;
            padding:0% 0% 5% 0%;
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
      const res2 = await axios.get('/badge',{headers: { cookie: ctx.req.headers.cookie }})
      const data2 = await res2.data
      const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
      const hint = await res3.data
      const res4 = await axios.get('/rooms',{headers: { cookie: ctx.req.headers.cookie}})
      const rooms = await res4.data
      const res5 = await axios.get('/notify',{headers: { cookie: ctx.req.headers.cookie}})
      const notify = await res5.data
      return { props: { data:{badge:data2,...data1,hint:hint,rooms,notify} } }
    }
    else{
      return { props: { data: {err:true}}}
    }
  }
  catch(err){
    return {props: {data:{err:true}}}
  }
    
}
export default Badge;