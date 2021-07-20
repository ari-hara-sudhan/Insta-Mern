import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Button } from '@material-ui/core';
import firebase from "firebase"
import BackspaceIcon from '@material-ui/icons/Backspace';
function Post({username,comment,imageUrl,postId,user}) {
    console.log(user)
    const [comments,setComments]=useState([]);
    const [input,setInput]=useState();

    const post=(e)=>{
        e.preventDefault()
       db.collection("posts").doc(postId).collection("comments")
       .add({
           text:input,
           username:username,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })
       setInput("");

    }
    useEffect(()=>{
        let unsubcribe;
        if(postId){
            unsubcribe=db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot=>{
                setComments(snapshot.docs.map(doc=>doc.data()))
            });


        }
        return()=>{
            unsubcribe();
        }
    },[postId])
    return (
        <div className="post">
       
            <div className="post__header">
            <Avatar/>
            <h3 className="post__user">{username}</h3>
            </div>
            <img className="post__image" src= {imageUrl} alt="insta"/>
            <p className="post__info"><strong className="post__content">{username}</strong>{comment}</p>
            {username === user?.displayName && <BackspaceIcon className="post__delete" onClick={e=>db.collection("posts").doc(postId).delete()}/>}
            <div className="post__container" >
         {
             comments.map(comment=>(
                 <p><strong className="comment__name">{user} </strong>{comment.text}</p>
    ))
         }

        

   

     </div>    
            <form className="post__form">
                <input value={input} onChange={e=>setInput(e.target.value)} />
                <Button type="submit" onClick={post}>Post</Button>


            </form>
          
         
        </div>
    )
}

export default Post
