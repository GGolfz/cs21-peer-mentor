import React from 'react'
import {Card} from 'antd'
const Hint = ({message,time,seen})=>{
    const displayTime = (t)=>{
        let temp = new Date(t)
        let D = temp.getDate()
        let M = temp.getMonth()
        let Y = temp.getFullYear()
        let h = temp.getHours()
        let m = temp.getMinutes()
        return D + "/"+ M+"/"+Y +" "+h+":"+m
    }
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
                    {displayTime(time)}
                </div>
            </div>
        </Card>
    )
}
export default Hint