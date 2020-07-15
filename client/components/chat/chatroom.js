import React, { useEffect } from 'react'
import {Row,Col,Input} from 'antd'
import ChatBubble from './chatbubble'
import Chat from '../../pages/chat'
const {Search} = Input
const ChatRoom = () =>{
    //Mock Data for Chat Room
    let data = {
        room: "ยังคิดไม่ออก",
        me: 'b',
        member: [
            {
                name: "Wisarut",
                profile_image: "https://storage.googleapis.com/cs21-peer-mentor/profile_img/03f117c211441309686defff2058d7e4.webp"
            },
        ],
        messages:[
            {
                sender:"Wisarut",
                message:"หวัดดี",
                time:"12:00:00",
                seen:[
                    "Wisarut","b","c"
                ]
            }
        ]
    }
    useEffect(()=>{
       var x= document.getElementById('chat-room')
       x.scrollTop = x.scrollHeight
    },[]);
    return (
        <div className="room">
            <Row>
                <Col span={24}>
                    <h2 style={{fontSize:"1.4em"}}>{data.room}</h2>
                </Col>
            </Row>
            <Row id="chat-room">
                {
                    data.messages.map(
                        (message,index)=>{
                            let start=false,end=false,who,img
                            if(index === 0 || (index > 0 && data.messages[index-1].sender !== message.sender)){
                                start = true
                            }
                            if(index === data.length-1 || (index < data.length-1 && data.messages[index+1].sender !== message.sender)){
                                end = true
                            }
                            if(message.sender === data.me){
                                who = 'me'
                            }
                            else{
                                who = 'him'
                                if(start){
                                    img = data.member.find(el=>el.name===message.sender).profile_image
                                }
                            }
                            return(
                                <Col key={index} span={24} style={{margin:"1% 0%"}}>
                                    <ChatBubble member={data.member.length} name={message.sender} nc={who} img={img} start={start} end={end} time={message.time} text={message.message}/>
                                </Col>
                            )
                        }
                    )
                }
            </Row>
            <Row id="search-bar">
                <Search enterButton="SEND"/> 
            </Row>
            <style jsx>
                {
                    `
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
                    .room{
                        height:100%;
                        background:#FFFFFF;
                        overflow-x:auto;
                    }
                    :global(#chat-room) {
                        height:85%;
                        overflow-x:auto;
                    }
                    :global(#search-bar) {
                        margin-top:1%;
                        padding:0% 3%;
                    }
                    `
                }

            </style>
        </div>
    )
}
export default ChatRoom;