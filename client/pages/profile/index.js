import Nav from '../../components/nav'
import BlackScreen from '../../components/blackscreen'
import ControlBar from '../../components/control-bar'
import ShowProfile from '../../components/profile/show-profile'
import axios from '../../axios/axios'
function Profile({data}) {
  console.log(data)
  return (
    <div className="container">
      <BlackScreen />
      <Nav />
      <div className="content">
        <div className="inside-content">
          <h1 style={{fontSize:"1.8em"}}>PROFILE</h1>
          <ShowProfile img={data.profile_img} display={data.display_name} name={data.name} year={data.year} bio={data.bio}/>
          
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
            height:85vh !important;
            text-align:center;
            background: #d4af5f44;
          }
          `
        }</style>
    </div>
  )
}
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await axios.get('/profile',{withCredentials:true})
    const data = await res.data
  
    // Pass data to the page via props
    return { props: { data } }
}

export default Profile;