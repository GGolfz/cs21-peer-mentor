import React from 'react'
function ControlButton(props){
    let data =props.data
    let icon =props.icon
    let color= props.color
    let notify= props.notify
    return(
        <div className="control-button" onClick={()=>{props.onGoto({href:`/${data}`})}}>
            <span className="material-icons" style={{color,fontSize:"2em"}}>
                {icon}
            </span>
            {data === 'chat' && notify >0 ? (
            <span className="notification">{notify}</span>) : ""
            }
            <style jsx>
                {
                    `
                    .notification {
                        color: #FFFFFF;
                        position: relative;
                        top: -20px;
                        left: -12px;
                        padding: 0px 8px;
                        background: #FE3D2F;
                        border-radius: 20px;
                    }
                    .control-button{
                        text-align:center;
                        width:100%;
                        align-self:center;
                        cursor:pointer;
                    }
                    `
                }

            </style>
        </div>
    )
}

export default ControlButton