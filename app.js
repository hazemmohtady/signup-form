const express=require("express");
const https = require('https');
const bodyParser=require("body-parser");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        fName:firstName,
        lName:lastName,
    }
  }
  ]
}
  const jsonData=JSON.stringify(data);
  const url='https://us18.api.mailchimp.com/3.0/lists/3d05823028'
  const options={
    method:"POST",
    auth:"hazem:f1d4c8df9319feede6ca089758bac6b1-us18",
  }
  const request=https.request(url,options,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      data=JSON.parse(data);
      console.log(data.error_count);
      if(data.error_count===0){
        res.sendFile(__dirname+"/success.html")
      }
      else{

      res.sendFile(__dirname+"/failure.html")
      }
   })


  })

  request.write(jsonData)
  request.end();


})
  app.post("/failure",function(req,res){
    res.redirect("/");
  })



app.listen(process.env.PORT || 3000,function(){
  console.log("app is running")
})




//     app id: f1d4c8df9319feede6ca089758bac6b1-us18
//      list id:3d05823028
