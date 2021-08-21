require('dotenv').config()
const express = require('express');
const https = require('https');
const apiKey = process.env.apiKey
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    
})
app.post("/", function (req, res) {
    const querry = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&units=metric&id=524901&appid="+apiKey;
    https.get(url, function (respo) {
        console.log(respo.statusCode);

        respo.on("data", function (data) {
            const wd = JSON.parse(data);
            const temp = wd.main.temp;
            const des = wd.weather[0].description;
            const icon = wd.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> temperature is " + temp + "</h1>");
            res.write("<p>weather is " + des+"</p>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        })
    });
    console.log(req);
})






app.listen(3000, function () {
    console.log("server is running");;
})