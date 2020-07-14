import React, { useState , useEffect} from 'react'
import ReactCrop from 'react-image-crop'
import {  Modal, Button  } from 'antd'
let imageRef =null
let profile_pic = null
function EditImage() {
    const [prosrc,setPro] = useState('https://lh3.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3')
    const [src,setSrc] = useState('')
    const [crop,setCrop] = useState({unit: "%",width: 50,aspect: 1 / 1})
    const [croppedImg,setCroppedImg] = useState(null)
    const [visible,setVisible] = useState(false)
    const handleFile = e => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setSrc(fileReader.result)
        }   
        fileReader.readAsDataURL(e.target.files[0])
        setVisible(true)
    }
    const handleCancel = e => {
        e.preventDefault()
        setVisible(false)
    }
    const handleSubmit = e => {
        e.preventDefault()
        setVisible(false)
        console.log(croppedImg)
    }
    const onImageLoaded = image => {
        imageRef = image
    }
    
    const onCropChange = (crop) => {
        setCrop(crop);
    }
    
    const onCropComplete = crop => {
        if (imageRef && crop.width && crop.height) {
            getCroppedImg(imageRef, crop)
        }
    }

    function getCroppedImg(image, crop) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
         )
    
        const reader = new FileReader()
        let filename = 'cropped.jpg'
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                dataURLtoFile(reader.result,filename)
            }
        })
    }
    function dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        setCroppedImg(croppedImage) 
    }
    return (
        <div>
            <input type='file' id='profile_pic' 
            onChange={handleFile} accept="image/*" hidden />
            <img width="30%" style={{borderRadius:"200px",cursor:"pointer"}} src={prosrc} onClick={()=>{
                document.getElementById('profile_pic').click()
            }}/>
            <Modal visible={visible}  footer={null} width="auto">
                <div className="back-button">
                <span className="material-icons" style={{fontSize:"2em"}} onClick={handleCancel}>
                arrow_back_ios
            </span>
                </div>
                <div className="modal-element">
                <ReactCrop
                  src={src}
                  crop={crop}
                  onImageLoaded={onImageLoaded}
                  onComplete={onCropComplete}
                  onChange={onCropChange}
                 />
                 </div>
                 <div className="save-button">
                <Button type="primary" style={{fontSize:"1.2em"}} onClick={handleSubmit}>Save</Button>
                </div>
            </Modal>
            <style jsx>
            {
                `
                @media only screen and (max-width:480px){
                    :global(.ant-modal) {
                    margin: 2%
                    }
                }
                @media only screen and (max-width:1024px) and (min-width:481px){
                    :global(.ant-modal) {
                      margin:0% 26%;
                    }
                }
                @media only screen and (min-width: 1025px) {
                    :global(.ant-modal) {
                      margin:0% 36%;
                    }
                }
                :global(.ant-modal-close) {
                    display:none;
                }
                .modal-element {
                    display:flex;
                    justify-content:center;
                    margin-bottom: 5%;
                }
                .save-button {
                    display:flex;
                    justify-content:flex-end;
                    margin-right:10%;
                }
                `
            }
            </style>
        </div>
    )
}
export default EditImage