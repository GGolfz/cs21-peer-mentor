import React from 'react'
import {Card,Row,Col} from 'antd'
import Router from 'next/router'
import axios from '../../axios/axios'
const ChatBox = ({data}) =>{   
    const join = (id) => {
        axios.patch('/notify',{roomID:id}).then(
            res=>{
                console.log(res)
            }
        ).catch(err=>{
            console.log(err)
        })
        Router.push(`/chat/${id}`)
    }
    const displayTime = (t) => {
            let date = new Date(t)
            let h = "0" + date.getHours()
            let m = "0" + date.getMinutes()
            return h.substring(h.length-2) + ":"+m.substring(m.length-2)
    }
    return (
        <Card style={{cursor:"pointer"}} onClick={()=>{join(data.roomID)}}>
            <Row style={{display:"flex",alignItems:"center"}}>
                <Col span={5}>
                    <img src={data.profile_image} style={{borderRadius:"200px"}} width="100%"/>
                </Col>
                <Col span={15}>
                    <Row style={{textAlign:"left"}}>
                    <Col span={24} style={{paddingLeft:"5%"}}>{data.name}</Col>
                    { data.bio !== '' ? (<Col span={24} style={{paddingLeft:"5%"}}>({data.bio})</Col>):<Col span={24}>&nbsp;</Col>}
                    {data.sender !== '' ? (
                    <Col span={24} style={{paddingLeft:"5%"}}>{data.sender}: {data.latest}</Col>):<Col span={24}>&nbsp;</Col>}
                    </Row>
                </Col>
                <Col span={4}>
                    <Row style={{justifyContent:"center",display:"flex"}}>
                    {
                        data.notify > 0?

                    (    
                        <Col 
                          span={24} 
                          style={{
                              fontSize:"1.2em",
                              background:"#4BB543",
                              color:"#FFFFFF",
                              borderRadius:"50%",
                              width:"35px",
                              height:"35px",
                              display:"flex",
                              alignItems:"center",
                              justifyContent: "center"
                            }}>{data.notify}</Col>

                    ):<Col span={24} style={{height:"35px"}} />
                    }
                    </Row>
                    <Row style={{marginTop:"15%"}}>
                        {
                            data.time !== '' ? (<Col span={24} style={{}}>{displayTime(data.time)}</Col>) : ''
                        }
                        
                    </Row>
                </Col>
            </Row>
            <style jsx>
                {
                    `
                    :global(.ant-card-body) {
                        padding: 12px 18px !important;
                    }
                    `
                }
            </style>
        </Card>
    )
}
export default ChatBox;