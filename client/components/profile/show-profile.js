import React,{useState} from 'react'
import { Input } from 'antd'
const {Search} = Input
function ShowProfile ({img,display,name,bio,year}) {
    const [tempDisplay,setTempDisplay] = useState(display)
    const [tempBio,setTempBio] = useState(bio)
    const editDisplay = ()=>{
        document.getElementById("showdisplay").style.display = "none";
        document.getElementById("editdisplay").style.display = "block";
    }
    const saveDisplay = ()=>{
        document.getElementById("showdisplay").style.display = "block";
        document.getElementById("editdisplay").style.display = "none";
    }
    const editBio = ()=>{
        document.getElementById("showbio").style.display = "none";
        document.getElementById("editbio").style.display = "block";
    }
    const saveBio = ()=>{
        document.getElementById("showbio").style.display = "block";
        document.getElementById("editbio").style.display = "none";
    }
    const changeDisplay = e=>{
        setTempDisplay(e.target.value)
    }
    const changeBio = e=>{
        setTempBio(e.target.value)
    }
    return (
    <div className="show-profile">
        <div className="displayName" id="showdisplay">
            <span>{display} </span>
            <span className="material-icons" style={{fontSize:"0.9em",cursor:"pointer"}} onClick={editDisplay}>edit</span>
        </div>
        <div className="editDisplay" id="editdisplay" style={{display:"none"}}>
            <Search placeholder="Display Name" value={tempDisplay} enterButton="SAVE" onChange={changeDisplay} onSearch={saveDisplay} maxLength="20" />
        </div>
        <div className="fix-detail">
            <div className="name">{name}</div>
            <div className="year">Year: {year}</div>
        </div>
        <div className="bio" id="showbio">
            Bio <span className="material-icons" style={{fontSize:"0.9em",cursor:"pointer"}} onClick={editBio}>edit</span> <br/>
            <div>{bio}</div>
        </div>
        <div className="editBio" id="editbio" style={{display:"none"}}>
            <Search placeholder="Bio" value={tempBio} enterButton="SAVE" onChange={changeBio} onSearch={saveBio} maxLength="40"/>
        </div>
        <style jsx>
            {
                `
                .show-profile {
                    padding: 0% 8%;
                    font-size: 1.2em;
                    height: 18vh;
                }
                .fix-detail{
                    display:flex;
                }
                .name{
                    width:75%;
                    text-align:center;
                }
                .year{
                    width:25%;
                    text-align:center;
                }
                `
            }
        </style>
    </div>
    )
}
export default ShowProfile