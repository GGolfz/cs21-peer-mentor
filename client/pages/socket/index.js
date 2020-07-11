
import React, { useState , useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import Router from 'next/router'
let socket
function Home() {
  const [room,setRoom] = useState(
    [{
    id: "2500",
    name: "สองพันห้าพี่ว่าไง",
    notify: 0,
    message: ""
    },{
      id: "3500",
      name: "ที่นี่สามพันห้า",
      notify: 0,
      message: ""
      },{
    id: "4500",
    name: "ขอสี่พันห้า",
    notify: 0,
    message: ""
    }
  ]
  )
  useEffect(() => {
    socket= socketIOClient("http://localhost:5000")
  }, []);
  const join = (id) => {
    Router.push(`/socket/${id}`)
  }
  useEffect(() => {
    socket.on('notify', (data) => {
      const {roomID,message,username} = data
      const temp = [... room]
      temp.map((r)=>{
        if(r.id === roomID){
          r.message = `${username} : ${message}`
          r.notify +=1
        }
      })
      setRoom(temp)
    })
  }, []);
  
  return (
    <div>
        {
          room.map(
              (rooms)=>{
                return <div key={room.id}><button onClick={() => join(rooms.id)}>{rooms.name}</button>{rooms.notify} {rooms.message}</div>
              }
            )
        }
    </div>
  )
}

export default Home