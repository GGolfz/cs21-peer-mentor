import React from 'react'
import {Card} from 'antd'
const Hint = ({message,time,seen})=>{
    return (
        <Card style={{marginBottom:"3%"}}>
            <div style={{textAlign:"left"}}>{message}</div>
            
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                <span>Status: &nbsp;</span>
                <span className="material-icons" style={{fontSize:"1.2em",alignSelf:"center"}}>
                    {seen ? "visibility":"visibility_off"}
                </span>
                </div>
                <div>
                    {time}
                </div>
            </div>
        </Card>
    )
}
export default Hint