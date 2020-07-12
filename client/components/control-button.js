import React from 'react'
import Link from 'next/link'
function ControlButton({data,icon,color}){
    return(
        <Link href={`/${data}`}>
        <div className="control-button">
            <span class="material-icons" style={{color,fontSize:"2em"}}>
                {icon}
            </span>
            <style jsx>
                {
                    `
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