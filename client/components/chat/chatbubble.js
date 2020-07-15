import React from 'react'
const Bubble = ({member,img,name,nc,text,start,end,time}) => {
    return (
        <div>
        
            <img className="profile_pic" src={img} width="36px" style={{float:"left",borderRadius:"50px"}}/>
            {member>2 && nc==='him'&&start? (<div style={{marginLeft:"calc(5% + 36px)",textAlign:"left"}}>{name}</div>) :''}
            <span className={`text ${nc} ${start?"start":""} ${end?"end":""}`} style={{marginLeft:(nc==='him' && img!=='' && !start)?"calc(5% + 36px)":'2%'}}>
                {text}
            </span>
            <span className={`${nc} time`}>
                {time}
            </span>
            <style jsx>
                {
                `
                .time {
                    height:36px;
                    display:flex;
                    align-items:center;
                    padding: 0% 1%;
                }
                .time.me {
                    justify-content:flex-end;
                }
                .time.him {
                    text-align:left
                }
                .profile_pic {
                    margin-left:3%;
                }

                .him.start {
                    border-top-left-radius: 10px;  
                  }
                  .him.end {
                    border-bottom-left-radius: 10px;  
                  }
                  .me.start {
                    border-top-right-radius: 10px;  
                  }
                  .me.end {
                    border-bottom-right-radius: 10px;  
                  }
                .text.me{
                    padding: 2%;
                    float:right;
                    text-align:left;
                    background:#d4af5f80;
                    border-radius: 10px 0 0 10px;
                    margin-right:3%;
                }
                .text.him{
                    padding: 2%;
                    text-align:left;
                    background:#F1F0F0;
                    border-radius: 0 10px 10px 0;
                    width:fit-content;
                    margin-left:2%;
                    float:left;
                }
                `
                }
            </style>
        </div>
    )
}
export default Bubble