import React from 'react'
import MicrosoftIcon from './microsoft-icon'
import { Button, AutoComplete } from 'antd'
const LoginButton = (props)=>{
    const login = () => {
        props.onLogin()
    }
    return(
        <Button onClick={login} id="login-button" style={{
            backgroundColor:"rgba(255,255,255,.5)",
            borderColor:"rgba(52,58,64,.2)",
            color: "#343a40",
            display: "flex",
            margin:"auto",
            alignItems: "center",
            fontSize: "1.2em"
            }} icon={<MicrosoftIcon />} size="large">
        &nbsp; Sign In with Microsoft 
        <style jsx>{`
            :global(#login-button:hover) {
                color: #fff !important;
                background-color: #343a40 !important;
                border-color: #343a40 !important;
            }
            :global(#login-button:active) {
                color: #fff !important;
                background-color: #343a40 !important;
                border-color: #343a40 !important;
            }
            `
        }</style>
        </Button>
    )
}
export default LoginButton