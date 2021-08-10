const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();







const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kapil:kapil@cluster0.jxchm.mongodb.net/contactsDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});







mongoose.connect("mongodb+srv://kapil:kapil@cluster0.jxchm.mongodb.net/contactsDB"||"mongodb://localhost:27017/contactUsDB",{ useNewUrlParser: true, useUnifiedTopology: true });


const contactSchema = {
    name: String,
    email: String,
    Number: String,
    message: String
}

const Contact = mongoose.model("Contact", contactSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.use("/",express.static("public"));
app.use("/events",express.static("eventPublic"));
app.use("/contactus",express.static("contactPublic"));
app.use("/sponsors",express.static("sponsorPublic"));
app.use("/team",express.static("teamPublic"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/ISTE/index.html");
});
app.get("/events", function(req,res){
    res.sendFile(__dirname+"/Events/index.html");
});
app.get("/contactus", function(req,res){
    res.sendFile(__dirname+"/contact/index.html");
});
app.get("/sponsors", function(req,res){
    res.sendFile(__dirname+"/sponsors_ISTE/index.html");
});
app.get("/team", function(req,res){
    res.sendFile(__dirname+"/team/index.html");
});

app.post("/contactus", function(req,res){
    // console.log(req.body.name);
    const data = new Contact({
        name: req.body.name,
        email: req.body.email,
        Number: req.body.num,
        message: req.body.message
    });
    data.save();
    res.redirect("/contactus");
});

app.listen(process.env.PORT||3000, function(){
    console.log("server started at port 3000");
});