import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Pusher from "Pusher"
import dbModel from "./dbModel.js"


//app config
const app = express()
const port =process.env.PORT || 8080;

const pusher = new Pusher({
    appId: "1238008",
    key: "fc80b0598c4608e6a4f2",
    secret: "326eb99eb16dff581489",
    cluster: "ap2",
    usetLS: true
  });
  
//middleware
app.use(cors())
app.use(express.json())
//db config

const connection_url='mongodb+srv://admin:bcM96pYrGEzfbbDG@cluster0.go0kz.mongodb.net/insta?retryWrites=true&w=majority'

mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.once('open',()=>{
    console.log("db is connected")

    const changedb=mongoose.connection.collection('posts').watch()

    changedb.on('change',(change)=>{
        console.log(change)


        if(change.operationType === 'insert'){
            console.log("upload stuff...")

            const postDetails=change.fullDocument;
            pusher.trigger('posts',"inserted",{
                user:postDetails.user,
                caption:postDetails.caption,
                image:postDetails.image,
            })
        }else{
            console.log(" some error ")
        }
    })
})

//api routes
app.post('/upload',(req,res)=>{
    const body=req.body;
    dbModel.create(body,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }

    })
})

app.get('/sync',(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get("/",(req, res) =>res.status(200).send("hello world for pryar prema kadhal..."))
app.get("/about",(req, res) =>res.status(200).send("hello ahs ur are a gud full stack dev.."))

//listen
app.listen(port,()=> console.log(`port is listening on ${port}`))