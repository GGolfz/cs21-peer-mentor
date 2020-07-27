import React from 'react'
import {Card,Row,Col} from 'antd'
const User = ({data}) =>{ 
    return (
        <Card style={{cursor:"pointer",marginBottom:"5%"}}>
            <Row style={{display:"flex",alignItems:"center"}}>
                <Col span={4}>
                    <img src={data.profile_img} style={{borderRadius:"200px"}} width="100%"/>
                </Col>
                <Col span={17}>
                    <Row style={{textAlign:"left"}}>
                    <Col span={24} style={{paddingLeft:"5%",fontSize:"1em"}}>{data.name}</Col>
                    {data.display_name !== '' ? (
                    <Col span={24} style={{paddingLeft:"5%"}}>{data.display_name}</Col>):<Col span={24}>&nbsp;</Col>}
                    { data.bio !== '' ? (<Col span={24} style={{paddingLeft:"5%"}}>({data.bio})</Col>):<Col span={24}>&nbsp;</Col>}
                    </Row>
                </Col>
                <Col span={3}>
                    <Row style={{justifyContent:"center",display:"flex"}}>
                    {
                        data.badge > 0?

                    (    
                        <Col 
                          span={24} 
                          style={{
                              fontSize:"1.2em",
                              background:"rgba(255,128,0,0.9)",
                              color:"#FFFFFF",
                              borderRadius:"50%",
                              width:"35px",
                              height:"35px",
                              display:"flex",
                              alignItems:"center",
                              justifyContent: "center"
                            }}>{data.badge}</Col>

                    ):<Col span={24} style={{height:"35px"}} />
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
export default User;