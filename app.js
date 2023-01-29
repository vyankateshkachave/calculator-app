const express = require("express");
const bodyParser= require("body-parser");
const https = require("https");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html")
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const api = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=b0e7f6b1f89ddf4344edd18a8f21abbd&units=metric";
    https.get(api,function(response){

        console.log(response.statusCode);
        
        response.on("data",function(data){
 
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

           res.send("Temputure of your city in degree celsius is"+ temp);
        })
    })
})

app.listen(5000,function(req,res){
    console.log("server started at port 5000");
})