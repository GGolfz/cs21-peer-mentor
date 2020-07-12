import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
let socket
function Room () {
    const room = useRouter().query.room
    const [join,setJoin] = useState(false)
    const [input,setInput] = useState('')
    const [message,setMessage] = useState([])
    const username = "TEST"

    useEffect(() => {
         socket= socketIOClient("http://localhost:5000")
      }, []);
    if(room && !join){
        socket.emit('joinRoom',{room:room,username})
        socket.on('message', (messageNew) => {
            setMessage(message=> [...message,messageNew])
            setInput('')
        })
        setJoin(true)
    }
    const send = () => {
        const data = {username,message:input,room:room}
        socket.emit('chatMessage', data)
    }
    const changeInput = (e) => {
        setInput(e.target.value)
    }
      return (
        <div>
            {room}
          <div>
            <input value={input} onChange={()=> changeInput(event)} />
            <button onClick={() => send()}>Send</button>
          </div>
          {
            message.map((data, i) =>
              <div key={i}>
                {i + 1} : {data}
              </div>
            )
          }
        </div>
      )
}
export default Room