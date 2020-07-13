import React, { Fragment } from 'react'
export default ()=>{
    return (
        <Fragment>
            <style jsx>
                {
                    `
                    @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap");  
                    :global(body) {
                      margin: 0;
                      font-family: "Nunito", sans-serif;
                      padding: 0px;
                      background:#121212;
                    }
                    `
                }

            </style>
        </Fragment>
    )
}