import React, {useEffect} from 'react'
import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import axios from '../../axios/axios'
import Router from 'next/router'
import {Row,Col} from 'antd'
const badgeList = 
[{
  "name": "Fire",
  "thai_name": "ไฟ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Fire_1.jpg",
  "member": ["06", "10", "25", "45", "70"],
  "check": false
},
{
  "name": "Thunderbolt",
  "thai_name": "สายฟ้า",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Thunderbolt_1.jpg",
  "member": ["22", "46", "48", "50", "53"],
  "check": false
},
{
  "name": "Water",
  "thai_name": "น้ำ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Water_1.jpg",
  "member": ["14", "19", "20", "39", "51", "59", "71"],
  "check": false
},
{
  "name": "Earth",
  "thai_name": "ดิน",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Earth_1.jpg",
  "member": ["01", "08", "16", "52"],
  "check": false
},
{
  "name": "Wind",
  "thai_name": "ลม",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Wind_1.jpg",
  "member": ["23", "43", "54", "56", "57", "63", "67"],
  "check": false
},
{
  "name": "Darkness",
  "thai_name": "ความมืด",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Darkness_1.jpg",
  "member": ["03", "41", "42", "55", "60", "64"],
  "check": false
},
{
  "name": "Bright Light",
  "thai_name": "แสง",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Bright%20Light_1.jpg",
  "member": ["17", "29", "33", "35"],
  "check": false
},
{
  "name": "Sun",
  "thai_name": "พระอาทิตย์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Sun_1.jpg",
  "member": ["09", "11", "27"],
  "check": false

},
{
  "name": "Moon",
  "thai_name": "พระจันทร์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Moon_1.jpg",
  "member": ["07", "21", "30", "38", "75"],
  "check": false
},
{
  "name": "Star",
  "thai_name": "ดาว",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Star_1.jpg",
  "member": ["34", "44", "61"],
  "check": false
},
{
  "name": "Vampire",
  "thai_name": "แวมไพร์",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Vampire_1.jpg",
  "member": ["02", "26", "28", "49", "72", "74"],
  "check": false
},
{
  "name": "Gem",
  "thai_name": "อัญมณี",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Gem_1.jpg",
  "member": ["05", "37", "58"],
  "check": false
},
{
  "name": "Forest",
  "thai_name": "ป่า",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Forest_1.jpg",
  "member": ["13", "15", "18", "24", "40", "65", "66"],
  "check": false
},
{
  "name": "Dimension",
  "thai_name": "มิติ",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Dimension_1.jpg",
  "member": ["32", "36", "47", "62", "68"],
  "check": false
},
{
  "name": "Cat-lover",
  "thai_name": "ธาตุแมว",
  "image_url": "https://storage.googleapis.com/cs21-peer-mentor/element_img/Cat-lover_1.jpg",
  "member": ["04", "12", "31"],
  "check": false
}
]
let have = new Set()
function Badge({data}) {
  useEffect(()=>{
    if(data.err){
      Router.push('/')
    }
  })
    data.badge.map(el=>{
      have.add(el.name)
    })
    badgeList.map(el=>{
      if(have.has(el.name)){
        el.check = true
      }
    })

  return (
    <div className="container">
      <BlackScreen />
      <Nav year = {data.year}/>
      <div className="content">
      <h1 style={{fontSize:"1.8em",marginBottom:"2vh",cursor:"default"}}>BADGE</h1>
        <Row>
        {
          badgeList.map((el,index)=>{
            if(el.check){
              return (<Col key={el.name} span={8}><img src={el.image_url} width="100%" style={{border:"red solid 1px"}}/>{el.name}</Col>)
            }
            return (<Col key={el.name} span={8}><img src={el.image_url} width="100%"/>{el.name}</Col>)
          })
        }
        </Row>
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
            overflow-x:auto;
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
      return { props: { data:{badge:data2,year:data1.year} } }
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