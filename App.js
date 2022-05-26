const Express=require("express")
const Mongoose=require("mongoose")
const BodyParser=require("body-parser")

var app=Express()
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())

app.get("/api/add",(req,res)=>{
    var data=req.body
    res.send(data)
})
app.listen(4005,(req,res)=>{
    console.log("server running")
})