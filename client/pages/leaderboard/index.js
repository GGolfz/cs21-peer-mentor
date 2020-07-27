import BlackScreen from '../../components/blackscreen'
import Header from '../../components/header'
import User from '../../components/user'
import axios from '../../axios/axios'
import React,{useState} from 'react'
const LeaderBoard = (props)=>{
    const [data,setData] = useState(props.data);
    console.log(data)
    return(
    <div className="container">
    <Header/>
    <BlackScreen/>
    <div className="content">
        <div style={{textAlign:"center"}}>
        <h1 style={{fontSize:"2.5em",fontWeight:"bolder"}}>LEADER BOARD</h1>
        </div>
        <div>
            {
                data.map(d=>{
                    return(<User data={d} />)
                })
            }

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
          padding-top: 12%;
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
export async function getServerSideProps(ctx) {
    const res = await axios.get('/leaderboard');
    const data =res.data.temp
    return {props: {data}}
}
export default LeaderBoard