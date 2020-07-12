import React from 'react'
import ControlButton from './control-button'
let data= 
[{name:"profile",icon:"account_circle",color:"#304FFE"},
{name:"chat",icon:"chat_bubble",color:"#F48FB1"},
{name:"scan",icon:"qr_code_scanner",color:"#212121"},
{name:"badge",icon:"local_police",color:"#EF6C00"}
]
function ControlBar(){
    return(
        <div className="control-bar">
            {
                data.map(el=> <ControlButton data={el.name} icon={el.icon} color={el.color}/>)
            }
            <style jsx>{
                `
                .control-bar {
                    display:flex;
                    height:8vh;
                }
                `
            }

            </style>
        </div>
    )
}

export default ControlBar