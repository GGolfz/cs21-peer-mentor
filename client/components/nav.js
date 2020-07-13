import React from 'react'
import Link from 'next/link'
import Header from './header'
import { Button } from 'antd'

const Nav = () => {
  return (
  <nav>
    <Header/>
    <div className="nav-bar">
        <span className="material-icons noti" style={{fontSize:"2em"}}>
          notifications
        </span>
      <div className="button-list">
        <Button type="dashed" style={{marginRight:"5%"}}>EDIT PROFILE</Button>
        <Link href="/"><Button type="dashed" id="ant-button-danger" style={{marginRight:"8%"}}>LOG OUT</Button></Link>
      </div>
    </div>
    <style jsx>{`
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