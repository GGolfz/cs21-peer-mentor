import React from 'react'
import Head from 'next/head'
export default  Headers = ()=> {
    return(
        <Head>
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <meta name='description' content='Description' />
            <meta name='keywords' content='Keywords' />
            <title>CS21 Peer Mentor</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <link rel='manifest' href='/manifest.json' />
            <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/apple-icon.png'></link>
            <meta name='theme-color' content='#d4af5f' />
            <link rel='stylesheet'   href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.min.css' />
        </Head>
    )
}