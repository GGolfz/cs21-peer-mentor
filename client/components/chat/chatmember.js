import React from 'react'
import {Card,Row,Col} from 'antd'
const Chatmember = ({data}) =>{  
    return (
        <Card style={{cursor:"pointer"}}>
            <Row style={{display:"flex",alignItems:"center"}}>
                <Col span={5}>
                    <img src={data.profile_image} style={{borderRadius:"200px"}} width="100%"/>
                </Col>
                <Col span={19}>
                    <Row style={{textAlign:"left"}}>
                    <Col span={24} style={{paddingLeft:"5%"}}>{data.display_name}</Col>
                    { data.bio !== '' ? (<Col span={24} style={{paddingLeft:"5%"}}>({data.bio})</Col>):<Col span={24}>&nbsp;</Col>}
                    {data.year === '1' ? (
                    <Col span={24} style={{paddingLeft:"5%"}}>{data.name}</Col>
                    ):<Col span={24}>&nbsp;</Col>}
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
export default Chatmember;