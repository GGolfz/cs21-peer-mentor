import React, { Fragment } from 'react'
export default ()=>{
    return (
        <Fragment>
            <style jsx>
                {
                    `
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