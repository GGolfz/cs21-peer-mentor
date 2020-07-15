import React, { useState, useEffect } from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import dynamic from "next/dynamic";
import {Input} from 'antd';
import axios from '../../axios/axios'
const {Search} = Input
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false});

const Scan = ({data1})=> {
  useEffect(()=>{
    if(data1.err){
      Router.push('/')
    }
  })
  const [result,setResult] = useState('')
  const handleScan = data => {
    if (data) {
      setResult(data)
      axios.post('/badge',{token:data}).then(
        (res)=>{
          setResult('')
        }
      ).catch(err=>{
        console.log(err)
      })
    }
  }
  const handleSearch = () => {
    if (result !== ''){
      axios.post('/badge',{token:result}).then(
        (res)=> {
          setResult('')
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
  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data1.year} hint={data1.hint?data1.hint:[]}/>
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
  if(ctx.req.headers.cookie){
    const res = await axios.get('/profile',{headers: { cookie: ctx.req.headers.cookie }})
    const data1 = await res.data
    const res3 = await axios.get('/hint',{headers: { cookie: ctx.req.headers.cookie}})
    const hint = await res3.data
    const data2 = {...data1,hint:hint}
    return { props: { data1:data2 }}
  }
  else{
    return { props: { data1: {err:true}}}
  }

}
export default Scan;