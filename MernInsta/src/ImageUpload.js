import React, { useState } from 'react'
import "./ImageUpload.css"
import { Button } from '@material-ui/core'
import db, {storage,auth} from "./firebase"
import firebase from 'firebase'
import axios from "./axios"
function ImageUpload({username}) {
const[image,setImage]=useState()
const[progress,setProgress]=useState(0)
const [input,setInput]=useState()

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const Upload=()=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image);


        uploadTask.on(
            "state_changed",

            (snapshot)=>{
                const  progress =Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);

            },
            (error)=>{
                alert(error.message);
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{


                    axios.post('/upload',{
                        caption:input,
                        user:username,
                        image:url,
                    })


                  
                    setProgress("");
                    setImage(null);
                    setInput("");
                })
            }

        )
    
    }
    return (
        <div className="imageupload">
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter the Caption" value={input} onChange={e=>setInput(e.target.value)} />
            <input type="file" onChange={handleChange}/>
            <Button  disabled={!image} onClick={Upload}>Submit</Button>
            
        </div>
    )
}

export default ImageUpload
