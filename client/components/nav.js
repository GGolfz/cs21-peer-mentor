import React from 'react'
import Link from 'next/link'
import Head from 'next/head'


const Nav = () => (
  <nav>
    <Head>
      <meta charset='utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name='description' content='Description' />
      <meta name='keywords' content='Keywords' />
      <title>CS21 Peer Mentor</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <link rel='manifest' href='/manifest.json' />
      <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/apple-icon.png'></link>
      <meta name='theme-color' content='#317EFB' />
    </Head>
    <div className="nav-bar">
      WAIT FOR NAV BAR
    </div>
    <style jsx>{`
      @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap");  
      :global(body) {
        margin: 0;
        font-family: "Nunito", sans-serif;
        padding: 0px;
        background:#121212;
      }
      .nav-bar {
        text-align:center;
        height:7vh !important;
      }
    `}</style>
  </nav>
)

export default Nav