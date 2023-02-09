const express = require("express")
require('dotenv').config();
const bodyParser = require("body-parser")

const https = require("https")
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
const API = process.env.API_KEY;

app.get("/" , (req , res)=>{res.sendFile(__dirname + "/signup.html")})

app.post("/" , (req,res)=>{
   const firstName = req.body.FirstName;
   const lastName = req.body.LastName;
   const email = req.body.email;
   const data = {
    members :[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName ,
                LNAME:lastName
            }
        }
    ]
   }
   const jsonData = JSON.stringify(data)
   const url = "https://us12.api.mailchimp.com/3.0/lists/808eebbfc0"
   const options = {
    method : "POST",
    auth:`priyank5:${API}-us12`
   }
   const request = https.request(url , options ,(response)=>{
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
        console.log(response)
    }
    response.on("data", (data)=>{
        
        console.log()
    })
   })
   request.write(jsonData)
   request.end();
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT || 3000 , ()=>{console.log("Server started on Port 3000")})

// apikey- 140613a0841b05a255314d1a1a565669-us12 
// new api -79ffd108227ac7a1aa6c95187f9d538b-us12 

// list-key = 808eebbfc0