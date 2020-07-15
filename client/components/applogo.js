import React from 'react'
const AppLogo = () =>{
    return (
        <div className="appLogo">
            <img src="/logo.png" width="50%"/>
            <style jsx>
                {
                    `
                    .appLogo {
                        margin-bottom: 15%;
                    }
                    `
                }
            </style>
        </div>
    )
}
export default AppLogo;