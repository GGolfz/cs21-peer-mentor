import BlackScreen from '../components/blackscreen'
import AppLogo from '../components/applogo'
import LoginButton from '../components/login-button'
import Header from '../components/header'
export default function Home() {
  const login = ()=>{
    let win = window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/microsoft`,"loginwindow",'width=400px,height=600px'); 
    
  }
  return (
    <div className="container">
      <Header/>
      <BlackScreen/>
      <div className="content">
        <div className="app-logo">
          <AppLogo/>
          <LoginButton onLogin={login}/>
        </div>
      </div>
      <style jsx>
        {`
          @media only screen and (max-width:480px){
          .container {
              margin: 0%
          }
          }
          @media only screen and (max-width:1024px) and (min-width:481px){
              .container {
                margin:0% 25%;
              }
          }
          @media only screen and (min-width: 1025px) {
              .container {
                margin:0% 35%;
              }
          }
          .container {
            background:white;
            height:100vh;
          }
          .app-logo {
            text-align:center;
          }
          .content {
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            background: rgb(255,248,220);
            background: linear-gradient(0deg, rgba(255,248,220,1) 0%, rgba(249,198,171,1) 100%);
          }
          `
        }
      </style>
    </div>
  )
}
