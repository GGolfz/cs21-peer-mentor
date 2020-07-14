import React from 'react'
function ShowProfile ({img,display,name,bio,year}) {
    return (
    <div className="show-profile">
        <div className="displayName">
            <span>{display} </span> EDIT
        </div>
        <div className="fix-detail">
            {name} {year}
        </div>
        <div className="bio">
            {bio}
        </div>
    </div>
    )
}
export default ShowProfile