import React from 'react'
import MicrosoftIcon from './microsoft-icon'
import { Button } from 'antd'
const LoginButton = ()=>{
    return(
        <Button id="login-button" style={{
            backgroundColor:"rgba(52,58,64,.1)",
            borderColor:"rgba(52,58,64,.1)",
            color: "#343a40",
            display: "flex",
            alignItems: "center",
            fontSize: "1.2em"
            }}icon={<MicrosoftIcon />} size="large">
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