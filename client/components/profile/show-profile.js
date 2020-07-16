import React,{useState} from 'react'
import { Input } from 'antd'
import axios from '../../axios/axios'
const {Search} = Input
function ShowProfile ({img,display,name,bio,year}) {
    const [displayName,setDisplay] = useState(display)
    const [curbio,setBio] = useState(bio)
    const [tempDisplay,setTempDisplay] = useState(displayName)
    const [tempBio,setTempBio] = useState(curbio)
    const editDisplay = ()=>{
        document.getElementById("editdisplay").style.display = "flex";
        let x = document.getElementById("badge").width
        document.getElementById('editdisplay').style.height = `${x}px`
        document.getElementById("showdisplay").style.display = "none";
    }
    const saveDisplay = ()=>{
        document.getElementById("showdisplay").style.display = "block";
        document.getElementById("editdisplay").style.display = "none";
        save()
    }
    const editBio = ()=>{
        document.getElementById("showbio").style.display = "none";
        document.getElementById("editbio").style.display = "block";
    }
    const saveBio = ()=>{
        document.getElementById("showbio").style.display = "block";
        document.getElementById("editbio").style.display = "none";
        save()
    }
    const save = () => {
        axios.patch('/profile',{bio:tempBio,display_name:tempDisplay})
        .then(
            res=>{
                setDisplay(res.data.display_name)
                setBio(res.data.bio)
            }
        ).catch(err=>{
            console.log(err)
        })
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
            <span><img id="badge" src={img} width="18%" /></span>
            <span>{displayName} </span>
            <span className="material-icons" style={{fontSize:"0.9em",cursor:"pointer"}} onClick={editDisplay}>edit</span>
        </div>
        <div className="editDisplay" id="editdisplay" style={{display:"none"}}>
            <Search className="edit-bar" placeholder="Display Name" value={tempDisplay} enterButton="SAVE" onChange={changeDisplay} onSearch={saveDisplay} maxLength="20" />
        </div>
        <div className="fix-detail">
            <div className="name">{name}</div>
            <div className="year">Year: {year}</div>
        </div>
        <div className="bio" id="showbio">
            Bio <span className="material-icons" style={{fontSize:"0.9em",cursor:"pointer"}} onClick={editBio}>edit</span> <br/>
            <div>{curbio}</div>
        </div>
        <div className="editBio" id="editbio" style={{display:"none"}}>
            <Search className="edit-bar" placeholder="Bio" value={tempBio} enterButton="SAVE" onChange={changeBio} onSearch={saveBio} maxLength="40"/>
        </div>
        <style jsx>
            {
                `
                .editDisplay{
                    margin-bottom: 2%;
                }
                .displayName{
                    margin-bottom: 2%;
                }
                .bio{
                    margin-bottom: 2%;
                }
                .editBio{
                    margin-bottom: 2%;
                }
                .show-profile {
                    padding: 2% 3%;
                    font-size: 1.2em;
                    height: auto;
                }
                .fix-detail{
                    display:flex;
                    margin-bottom: 2%;
                }
                .name{
                    width:75%;
                    text-align:center;
                }
                .year{
                    width:25%;
                    text-align:center;
                }
                :global(.edit-bar) {
                    padding:0% 5%;
                    align-self:center;
                }
                `
            }
        </style>
    </div>
    )
}
export default ShowProfile