import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import ShowProfile from '../../components/profile/show-profile'
import axios from '../../axios/axios'
import ProfileImg from '../../components/profile/edit-image'
function Profile({data}) {
  console.log(data)
  return (
    <div className="container">
      <BlackScreen />
      <Nav />
      <div className="content">
        <div className="inside-content" >
          <h1 style={{fontSize:"1.8em",marginBottom:"2vh"}}>PROFILE</h1>
          <ProfileImg img={data.profile_img} />
          <ShowProfile display={data.display_name} name={data.name} year={data.year} bio={data.bio}/>
        </div>
      </div>
      <ControlBar/>
      <style jsx>{
          `
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
          .inside-content{
            text-align:center;
            background: #FFFFFF;

          }
          .content {
            height:82vh !important;
            text-align:center;
            background: #d4af5f44;
          }
          `
        }</style>
    </div>
  )
}
export async function getServerSideProps(ctx) {
    //Fetch data from external API
    // const res = await fetch(`http://localhost:3050/profile`, {
    //   method: 'GET',
    //   credentials: 'include'
    // })
    const res = await axios.get('/profile',{headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined})
    const data = await res.data
  
    // Pass data to the page via props
    // const data = {
    //   name: "WISARUT KITTICHAROENPHONNGAM",
    //   year: "2",
    //   bio: "JUST A LAZY GUY",
    //   display_name: "ggolfz_"
    // }
     return { props: { data } }
}

export default Profile;