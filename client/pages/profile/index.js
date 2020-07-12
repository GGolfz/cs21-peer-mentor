import Nav from '../../components/nav'
import ControlBar from '../../components/control-bar'
function Profile() {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        CONTENT ZONE
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
          .content {
            height:85vh !important;
            text-align:center;
          }
          `
        }</style>
    </div>
  )
}

export default Profile;