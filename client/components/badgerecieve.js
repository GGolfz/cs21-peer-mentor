import React from 'react'
import {Row,Col,Button} from 'antd'
const BadgeRecieve = (props) =>{
    return (
        <div className="badge">
            <h2 style={{fontSize:"1.5em"}}>New Friend !</h2>
            <Row>
                <Col span={24}>
                    <h3 style={{fontSize:"1.25em"}}>{props.data.name}</h3>
                </Col>
                <Col span={24}>
                    <img src={props.data.profile_img} style={{borderRadius:"200px"}} width="30%"/>
                </Col>
                <Col span={24}>
                    <h3 style={{fontSize:"1.25em"}}>{props.data.display_name}</h3>
                </Col>
                <Col span={24}>
                    <h3 style={{fontSize:"1.25em"}}>{props.data.bio?"("+props.data.bio+")":''}</h3>
                </Col>
                <Col span={24}>
                    <img src={props.data.element.image_url} width="30%" />
                </Col>
                <Col span={24}>
                    <h3 style={{fontSize:"1.2em"}}>{props.data.element.name}</h3>
                </Col>
                <Col span={24}>
                    <Button onClick={()=>{props.onOk()}} style={{color:"#FFFFFF",background:"#4CAF50",borderColor:"#4CAF50"}}>OK</Button>
                </Col>
            </Row>
        </div>
    )
}
export default BadgeRecieve;