import React, { useState , useEffect} from 'react'
import ReactCrop from 'react-image-crop'
import {  Modal, Button  } from 'antd'
import axios from '../../axios/axios'
let imageRef = null
function EditImage({img}) {
    const [prosrc,setPro] = useState(img?img:"")
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
        imageRef = null
        setVisible(false)
    }
    const handleSubmit = e => {
        e.preventDefault()
        setVisible(false)
        console.log(croppedImg)
        const formData = new FormData()
        formData.append('profile_pic',croppedImg)
        axios.post('/profilepic',formData,{headers:{'content-type': 'multipart/form-data'}})
        .then(
            (res)=>{
                setPro(res.data.profile_img)
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
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
        <div id="edit">
            <input type='file' id='profile_pic' 
            onChange={handleFile} accept="image/*" hidden />
            <img width="30%" style={{borderRadius:"200px",cursor:"pointer",marginBottom:"5%"}} src={prosrc} onClick={()=>{
                document.getElementById('profile_pic').click()
            }}/>
            <Modal wrapClassName="edit_profile_modal" visible={visible}  footer={null} width="auto">
                <div className="back-button">
                <span className="material-icons" style={{fontSize:"2em",cursor:"pointer"}} onClick={handleCancel}>
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
                :global(.edit_profile_modal .ant-modal-close) {
                    display:none !important;
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