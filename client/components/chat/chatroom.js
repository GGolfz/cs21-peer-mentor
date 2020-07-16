import React, { useEffect, useState } from 'react'
import {Row,Col,Input,Modal} from 'antd'
import ChatBubble from './chatbubble'
import Link from 'next/link'
const {Search} = Input
const ChatRoom = (props) =>{
    const [text,setText] = useState('')
    const data = props.data
    const messages = props.messages
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
       var x= document.getElementById('chat-room')
       x.scrollTop = x.scrollHeight
    },[]);
    const send = ()=> {
        props.onSend(text)
        setText('')
    }
    const showInfo =()=>{
        setVisible(true)
    }
    const handleChange = (e)=>{
        setText(e.target.value)
    }
    const displayTime = (t)=>{
        let date = new Date(t)
        let h = "0" + date.getHours()
        let m = "0" + date.getMinutes()
        let s = "0" + date.getSeconds()
        return h.substring(h.length-2) + ":"+m.substring(m.length-2)+":"+s.substring(s.length-2)
    }
    return (
        <div className="room">
            <Modal visible={visible} width="auto" footer={null} onCancel={()=>{setVisible(false)}}>
                <Row>
                    <Col span={24}>
                    <h2 style={{fontSize:"1.4em",textAlign:"center",cursor:"default"}}>
                        {
                        data.member.length === 2?data.member.find(el=>el.name!==data.me).name : data.room
                        }
                    </h2>
                    </Col>
                    <Col span={24}>

                    </Col>
                </Row>
            </Modal>
            <Row>
                <Col span={4}>
                    <Link href="/chat">
                        <span className="material-icons" style={{padding:"5%",cursor:"pointer"}}>arrow_back_ios</span>
                    </Link>
                </Col>
                <Col span={16}>
                    <h2 style={{fontSize:"1.4em",cursor:"default"}}>{data.room}</h2>
                </Col>
                <Col span={4}>
                    <span className="material-icons" style={{padding:"5%",cursor:"pointer"}} onClick={showInfo}>info</span>
                </Col>
            </Row>
            <Row id="chat-room">
                {
                    messages && messages.map(
                        (message,index)=>{
                            let start=false,end=false,who,img
                            if(index === 0 || (index > 0 && messages[index-1].sender !== message.sender)){
                                start = true
                            }
                            if(index === messages.length-1 || (index < messages.length-1 && messages[index+1].sender !== message.sender)){
                                end = true
                            }
                            if(message.sender === props.me || message.sender === 'You'){
                                who = 'me'
                            }
                            else{
                                who = 'him'
                                if(start){
                                    img = data.member.find(el=>el.display_name===message.sender).profile_image
                                }
                            }
                            return(
                                <Col key={index} span={24} style={{margin:"1% 0%"}}>
                                    <ChatBubble member={data.member.length} name={message.sender} nc={who} img={img} start={start} end={end} time={displayTime(message.time)} text={message.message}/>
                                </Col>
                            )
                        }
                    )
                }
            </Row>
            <Row id="search-bar">
                <Search onChange={handleChange} value={text} enterButton="SEND" onSearch={send}/> 
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