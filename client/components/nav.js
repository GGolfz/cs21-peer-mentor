import React, {useState, Fragment} from 'react'
import Link from 'next/link'
import Header from './header'
import { Button, Modal,Input } from 'antd'
import Hint from './hint'
import axios from '../axios/axios'
const {Search} = Input

const Nav = (props) => {
  const [hints,setHints] = useState(props.hint)
  const [message,setHint] = useState('')
  const [visible,setVisible] = useState(false)
  const [addVisible,setAddVisible] = useState(false)
  const calculateNotify = (h)=>{
    let temp = 0
    h.map(el=>{
      if(!el.seen){
        temp+=1
      }
    })
    return temp;
  }
  const [notify,setNotify] = useState(()=>{
    let temp = 0
    hints.map(el=>{
      if(!el.seen){
        temp+=1
      }
    })
    return temp;
  })
  const showHint = ()=>{
    setVisible(true)
    if(props.year === '1'){
      axios.patch('/hint').then(async res=>{
        await setHints(res.data)
        await setNotify(calculateNotify(res.data))
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
  const handleClose = ()=>{
    setVisible(false)
  }
  const handleChange = (e)=>{
    setHint(e.target.value)
  }
  const addHint = ()=>{
    setAddVisible(true)
  }
  const closeAdd = () => {
    setAddVisible(false)
  }
  const handleSubmit =() =>{
    setAddVisible(false)
    axios.post('/hint',{message}).then(
      async (res)=>{
        await setHints(res.data.reverse())
        await setNotify(calculateNotify(res.data))
        await props.onAdd({reciever:res.data[0].reciever,hint:res.data})
      }
    ).catch(err=>{
      console.log(err)
    })
  }
  return (
  <nav className="nav-bar">
    <Header/>
    <div>
      { (props.year=== '1' || props.year==='2') && (
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
        <Search onChange={handleChange} enterButton="ADD" onSearch={handleSubmit}/>
      </Modal>
      <Modal wrapClassName="hint-list" onCancel={handleClose} visible={visible} width="auto" footer={null} style={{textAlign:"center",height:"75vh"}}>
        <h2 style={{fontSize:"1.8em"}}>HINT</h2>
        {
          props.year !== "1" && 
            (
              <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Button type="primary" style={{fontSize:"1.4em",padding:"0% 3%",borderRadius:"10px",marginBottom:"3%"}} onClick={addHint}>+</Button> <br/>
              </div>
            )
        }
        <div style={{height:"60vh",overflowY:"auto"}}>
        { 
          hints.map((el,index)=>{
          return <Hint key={index} message={el.message} seen={el.seen} time={el.created_at} />
          })
        }
        </div>
      </Modal>
      
      <div className="button-list">
        <a href={`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`}><Button type="dashed" id="ant-button-danger" style={{marginRight:"8%"}}>LOG OUT</Button></a>
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
      :global(.hint-list .ant-card-body){
        padding:24px !important;
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