import React, {useEffect} from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
function Badge({data}) {
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
  return (
    <div className="container">
      <BlackScreen />
      <Nav />
      <div className="content">
        {
          data.badge.map(el=>{
          return (<div>{el.name}</div>)
          })
        }
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
  try{
    if(ctx.req.headers.cookie){
      const res = await axios.get('/badge',{headers: { cookie: ctx.req.headers.cookie }})
      const data = await res.data
      return { props: { data:{badge:data} } }
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