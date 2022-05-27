const Express=require("express")
const Mongoose=require("mongoose")
const BodyParser=require("body-parser")

var app=Express()
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var bloodModel=Mongoose.model("bloodbanks",
new Mongoose.Schema(
    {
        name:String,
        address:String,
        bloodgroup:String,
        mobileno:String,
        username:String,
        password:String
    })
)
Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/bloodbankDB")

app.get("/api/view",(req,res)=>{
    bloodModel.find(
        (error,data)=>{
            if(error){
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }
        }
    )


})

app.post("/api/add",(req,res)=>{
    var data=req.body
    let ob=new bloodModel(data)
    ob.save(
        (error,data)=>{
            if(error){
res.send({"status":"error"})
            }
            else
            {
                res.send({"status":"success","data":data})
            }
        }
    )
    res.send(data)
})

app.post("/api/search",(req,res)=>{
    var getBloodgroup=req.body
    bloodModel.find(getBloodgroup,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send(data)
        }
    })
})

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    bloodModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        }
    })
})

app.listen(4005,(req,res)=>{
    console.log("server running")
})