import React from 'react'
import ControlButton from './control-button'
import {useRouter} from 'next/router'
let data= 
[{name:"profile",icon:"account_circle",color:"#d4af5f"},
{name:"chat",icon:"chat_bubble",color:"#d4af5f"},
{name:"scan",icon:"qr_code_scanner",color:"#d4af5f"},
{name:"badge",icon:"local_police",color:"#d4af5f"}
]
function ControlBar(){
    let route = useRouter().pathname.split('/')[1]
    return(
        <div className="control-bar">
            {
                data.map(el=> <ControlButton key={el.name} data={el.name} icon={el.icon} color={route===el.name?el.color:el.color+"AA"}/>)
            }
            <style jsx>{
                `
                .control-bar {
                    display:flex;
                    height:8vh;
                    border-top:solid 1px #d3d3d3;
                }
                `
            }

            </style>
        </div>
    )
}

export default ControlBar