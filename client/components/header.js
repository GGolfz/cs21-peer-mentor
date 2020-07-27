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
            <link href='/favicon.ico' rel='icon' type='image/png' sizes='16x16' />
            <link href='/favicon.ico' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/logo.png'/>
            <meta name='theme-color' content='#d4af5f' />
            <link rel='stylesheet'   href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.min.css' />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&family=Roboto:wght@100&display=swap" rel="stylesheet">
              </link>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-173061555-1"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  const gtag = ()=>{
                    dataLayer.push(arguments);
                  }
                  gtag('js', new Date());
                  gtag('config', 'UA-173061555-1',{
                    page_path: window.location.pathname,
                  });
                  `
              }}
            >
            </script>
            <style>
                {
                    `.ReactCrop {
                        position: relative;
                        display: inline-block;
                        cursor: crosshair;
                        overflow: hidden;
                        max-width: 80%; }
                        .ReactCrop:focus {
                          outline: none; }
                        .ReactCrop--disabled, .ReactCrop--locked {
                          cursor: inherit; }
                        .ReactCrop__image {
                          display: block;
                          max-width: 100%;
                          touch-action: manipulation; }
                        .ReactCrop__crop-selection {
                          border-radius:200px;
                          position: absolute;
                          top: 0;
                          left: 0;
                          transform: translate3d(0, 0, 0);
                          box-sizing: border-box;
                          cursor: move;
                          box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
                          touch-action: manipulation;
                          border: 1px solid;
                          border-image-source: url("data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==");
                          border-image-slice: 1;
                          border-image-repeat: repeat; }
                          .ReactCrop--disabled .ReactCrop__crop-selection {
                            cursor: inherit; }
                          .ReactCrop--circular-crop .ReactCrop__crop-selection {
                            border-radius: 50%;
                            box-shadow: 0px 0px 1px 1px white, 0 0 0 9999em rgba(0, 0, 0, 0.5); }
                        .ReactCrop--invisible-crop .ReactCrop__crop-selection {
                          display: none; }
                        .ReactCrop__rule-of-thirds-vt::before, .ReactCrop__rule-of-thirds-vt::after, .ReactCrop__rule-of-thirds-hz::before, .ReactCrop__rule-of-thirds-hz::after {
                          content: '';
                          display: block;
                          position: absolute;
                          background-color: rgba(255, 255, 255, 0.4); }
                        .ReactCrop__rule-of-thirds-vt::before, .ReactCrop__rule-of-thirds-vt::after {
                          width: 1px;
                          height: 100%; }
                        .ReactCrop__rule-of-thirds-vt::before {
                          left: 33.3333%;
                          left: calc(100% / 3); }
                        .ReactCrop__rule-of-thirds-vt::after {
                          left: 66.6666%;
                          left: calc(100% / 3 * 2); }
                        .ReactCrop__rule-of-thirds-hz::before, .ReactCrop__rule-of-thirds-hz::after {
                          width: 100%;
                          height: 1px; }
                        .ReactCrop__rule-of-thirds-hz::before {
                          top: 33.3333%;
                          top: calc(100% / 3); }
                        .ReactCrop__rule-of-thirds-hz::after {
                          top: 66.6666%;
                          top: calc(100% / 3 * 2); }
                        .ReactCrop__drag-handle {
                          position: absolute; }
                          .ReactCrop__drag-handle::after {
                            position: absolute;
                            content: '';
                            display: block;
                            width: 10px;
                            height: 10px;
                            background-color: rgba(0, 0, 0, 0.2);
                            border: 1px solid rgba(255, 255, 255, 0.7);
                            box-sizing: border-box;
                            outline: 1px solid transparent; }
                        .ReactCrop .ord-nw {
                          top: 0;
                          left: 0;
                          margin-top: -5px;
                          margin-left: -5px;
                          cursor: nw-resize; }
                          .ReactCrop .ord-nw::after {
                            top: 0;
                            left: 0; }
                        .ReactCrop .ord-n {
                          top: 0;
                          left: 50%;
                          margin-top: -5px;
                          margin-left: -5px;
                          cursor: n-resize; }
                          .ReactCrop .ord-n::after {
                            top: 0; }
                        .ReactCrop .ord-ne {
                          top: 0;
                          right: 0;
                          margin-top: -5px;
                          margin-right: -5px;
                          cursor: ne-resize; }
                          .ReactCrop .ord-ne::after {
                            top: 0;
                            right: 0; }
                        .ReactCrop .ord-e {
                          top: 50%;
                          right: 0;
                          margin-top: -5px;
                          margin-right: -5px;
                          cursor: e-resize; }
                          .ReactCrop .ord-e::after {
                            right: 0; }
                        .ReactCrop .ord-se {
                          bottom: 0;
                          right: 0;
                          margin-bottom: -5px;
                          margin-right: -5px;
                          cursor: se-resize; }
                          .ReactCrop .ord-se::after {
                            bottom: 0;
                            right: 0; }
                        .ReactCrop .ord-s {
                          bottom: 0;
                          left: 50%;
                          margin-bottom: -5px;
                          margin-left: -5px;
                          cursor: s-resize; }
                          .ReactCrop .ord-s::after {
                            bottom: 0; }
                        .ReactCrop .ord-sw {
                          bottom: 0;
                          left: 0;
                          margin-bottom: -5px;
                          margin-left: -5px;
                          cursor: sw-resize; }
                          .ReactCrop .ord-sw::after {
                            bottom: 0;
                            left: 0; }
                        .ReactCrop .ord-w {
                          top: 50%;
                          left: 0;
                          margin-top: -5px;
                          margin-left: -5px;
                          cursor: w-resize; }
                          .ReactCrop .ord-w::after {
                            left: 0; }
                        .ReactCrop__disabled .ReactCrop__drag-handle {
                          cursor: inherit; }
                        .ReactCrop__drag-bar {
                          position: absolute; }
                          .ReactCrop__drag-bar.ord-n {
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 6px;
                            margin-top: -3px; }
                          .ReactCrop__drag-bar.ord-e {
                            right: 0;
                            top: 0;
                            width: 6px;
                            height: 100%;
                            margin-right: -3px; }
                          .ReactCrop__drag-bar.ord-s {
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 6px;
                            margin-bottom: -3px; }
                          .ReactCrop__drag-bar.ord-w {
                            top: 0;
                            left: 0;
                            width: 6px;
                            height: 100%;
                            margin-left: -3px; }
                        .ReactCrop--new-crop .ReactCrop__drag-bar,
                        .ReactCrop--new-crop .ReactCrop__drag-handle,
                        .ReactCrop--fixed-aspect .ReactCrop__drag-bar {
                          display: none; }
                        .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,
                        .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,
                        .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,
                        .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w {
                          display: none; }
                        @media (pointer: coarse) {
                          .ReactCrop .ord-n,
                          .ReactCrop .ord-e,
                          .ReactCrop .ord-s,
                          .ReactCrop .ord-w {
                            display: none; }
                          .ReactCrop__drag-handle {
                            width: 24px;
                            height: 24px; } }
                      `
                }
            </style>
        </Head>
    )
}