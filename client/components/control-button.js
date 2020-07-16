import React from 'react'
import Link from 'next/link'
function ControlButton({data,icon,color,notify}){
    return(
        <Link href={`/${data}`}>
        <div className="control-button">
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
        </Link>
    )
}

export default ControlButton