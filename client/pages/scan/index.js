import React, { useState, useEffect } from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import dynamic from "next/dynamic";
import {Input,Modal} from 'antd';
import axios from '../../axios/axios'
import socketIOClient from 'socket.io-client'
import Router from 'next/router'
import BadgeRecieve from '../../components/badgerecieve'
const {Search} = Input
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false});
let socket
const Scan = ({data})=> {
  const [notify,setNotify] = useState(data.notify)
  const [hints,setHints] = useState(data.hint)
  const [badge,setBadge] = useState(null)
  const [visible,setVisible] = useState(false)
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
  useEffect(()=>{
    return ()=>{socket.emit('disconnect')}
  },[]);
  const [result,setResult] = useState('')
  const handleScan = scanData => {
    if (scanData) {
      setResult(scanData)
      axios.post('/badge',{token:scanData}).then(
        (res)=>{
          setResult('')
          setBadge(res.data)
          setVisible(true)
        }
      ).catch(err=>{
        console.log(err)
      })
    }
  }
  const handleClose = () => {
    setVisible(false)
  }
  const handleSearch = () => {
    if (result !== ''){
      axios.post('/badge',{token:result}).then(
        (res)=> {
          setResult('')
          setBadge(res.data)
          setVisible(true)
        }
      ).catch(err=>{
        console.log(err)
      })
    }
  }
  const handleChange = (e) => {
    setResult(e.target.value)
  }
  const handleError = err => {
    console.error(err)
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
      <div className="screen">
      <Nav year = {data.year} hint={hints?hints:[]} onAdd={addHint}/>
      <div className="content">
        <div className="head-content">
          <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>Add Friend</h1>
        </div>
        <div className="inside-content">
        <div style={{textAlign:"left",fontSize:"1.2em"}}>Enter Friend Code</div>
        <Search enterButton="ADD" onChange={handleChange} onSearch={handleSearch} />
        <div className="or-text">OR</div>
        <div className="qr-code-reader">
        <QrReader delay={300} onScan={handleScan} onError={handleError}  style={{ width: '70%' }} />    
        </div>
        </div>
        <Modal onCancel={handleClose} visible={visible} width="auto" footer={null} style={{padding:"1%",textAlign:"center",height:"75vh"}}>
          <BadgeRecieve data={badge} onOk={handleClose}/>
        </Modal>
      </div>
      <ControlBar notify={notify} onGoto={goTo}/>
      </div>
      <style jsx>{
          `
          @media only screen and (max-width:480px){
          .container {
              margin: 0%
          }
          :global(.ant-modal) {
          margin: 2%
          }
          }
          @media only screen and (max-width:1024px) and (min-width:481px){
              .container {
                margin:0% 25%;
              }
              :global(.ant-modal) {
              margin:0% 26%;
              }
          }
          @media only screen and (min-width: 1025px) {
              .container {
                margin:0% 35%;
              }
              :global(.ant-modal) {
              margin:0% 36%;
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
            background: #d4af5f44;
          }
          .head-content {
            background: #FFFFFF;
            padding-bottom: 2%;
          }
          .inside-content {
            padding: 3% 8%;
            background: #FFFFFF;
            margin-top:5%;
          }
          .or-text {
            margin: 5% 0%;
          }
          .qr-code-reader{
            display:flex;
            justify-content:center;
            margin-bottom:5%;
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
      const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
      const hint = await res3.data
      const res4 = await axios.get('/rooms',{headers: { cookie: ctx.req.headers.cookie}})
      const rooms = await res4.data
      const res5 = await axios.get('/notify',{headers: { cookie: ctx.req.headers.cookie}})
      const notify = await res5.data.notify
      return { props: { data: {...data1,hint:hint,rooms,notify}}}
    }
    else{
      return { props: { data: {err:true}}}
    }
  }
  catch(err){
    return {props: {data:{err:true}}}
  }

}
export default Scan;