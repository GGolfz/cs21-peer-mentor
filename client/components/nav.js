import React, {useState, Fragment} from 'react'
import Link from 'next/link'
import Header from './header'
import { Button, Modal,Input } from 'antd'
import Hint from './hint'
const {Search} = Input
const hint = [
  {
    message:"Hello4",
    time:"15:00:00",
    seen:false
  },
  {
    message:"Hello3",
    time:"14:00:00",
    seen:false
  },
  {
    message:"Hello2",
    time:"13:00:00",
    seen:false
  },
  {
    message:"Hello2",
    time:"12:00:00",
    seen:true
  }
]

const Nav = ({year}) => {
  const [visible,setVisible] = useState(false)
  const [addVisible,setAddVisible] = useState(false)
  const [notify,setNotify] = useState(()=>{
    let temp = 0
    hint.map(el=>{
      if(!el.seen){
        temp+=1
      }
    })
    return temp;
  })
  const showHint = ()=>{
    setVisible(true)
    setNotify(0)
  }
  const handleClose = ()=>{
    setVisible(false)
  }
  const addHint = ()=>{
    setAddVisible(true)
  }
  const closeAdd = () => {
    setAddVisible(false)
  }
  const handleSubmit =() =>{
    setAddVisible(false)
  }
  return (
  <nav>
    <Header/>
    <div className="nav-bar">
      { (year=== '1' || year==='2') && (
        <Fragment>
        <span className="material-icons noti" style={{fontSize:"2em",color:notify>0?"#ff4d4f":""}} onClick={showHint}>
          notifications
        </span>
        <span style={{cursor:"pointer",position:"relative",left:"-1%",top:"2%",color:"#ff4d4f" }} onClick={showHint}>{notify>0?notify:""}</span>
        </Fragment>
      )   
      }  
      <Modal onCancel={closeAdd} visible={addVisible} width="auto" footer={null} style={{textAlign:"center",padding:"2%"}}>
        <h2 style={{fontSize:"1.4em"}}>ADD HINT</h2>
        <Search enterButton="ADD" onSearch={handleSubmit}/>
      </Modal>
      <Modal onCancel={handleClose} visible={visible} width="auto" footer={null} style={{textAlign:"center"}}>
        <h2 style={{fontSize:"1.8em"}}>HINT</h2>
        {
          year !== "1" && 
            (
              <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Button type="primary" style={{fontSize:"1.4em",padding:"0% 3%",borderRadius:"10px",marginBottom:"3%"}} onClick={addHint}>+</Button> <br/>
              </div>
            )
        }
        { 
          hint.map((el,index)=>{
          return <Hint key={index} message={el.message} time={el.time} />
        })}
      </Modal>
      
      <div className="button-list">
        <a href="http://localhost:3050/logout"><Button type="dashed" id="ant-button-danger" style={{marginRight:"8%"}}>LOG OUT</Button></a>
      </div>
    </div>
    <style jsx>{`

      @media only screen and (max-width:480px){
          :global(.ant-modal) {
          margin: 2%
          }
      }
      @media only screen and (max-width:1024px) and (min-width:481px){
          :global(.ant-modal) {
          margin:0% 26%;
          }
      }
      @media only screen and (min-width: 1025px) {
          :global(.ant-modal) {
          margin:0% 36%;
          }
      }
      :global(#ant-button-danger:hover) {
        color: #ff7875 !important;
        border-color: #ff7875 !important;
      }
      :global(#ant-button-danger:active) {
        color: #ff7875 !important;
        border-color: #ff7875 !important;
      }
      .nav-bar {
        display:flex;
        height:7vh !important;
        padding: 2% 3% 0% 3%;
        margin-bottom: 3vh;
      }
      .noti {
        align-self:center;
        cursor:pointer;
      }
      .button-list {
        display:flex;
        justify-content:space-around;
        align-self:center;
        margin-left:auto;
      }
    `}</style>
  </nav>
  )
}

export default Nav