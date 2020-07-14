import React from 'react'
import {Card} from 'antd'
const Hint = ({message,time})=>{
    return (
        <Card style={{marginBottom:"3%"}}>
            <div style={{textAlign:"left"}}>{message}</div>
            <div style={{textAlign:"right"}}>{time}</div>
        </Card>
    )
}
export default Hint