const express = require("express")
const app = express();
//mongoose
const mongoose = require("mongoose");
//mogoose +> promise library

mongoose
    .connect(
        "mongodb+srv://ashish:ashish123@cluster0-ld31h.mongodb.net/test?retryWrites=true&w=majority",
        {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
    )
    .then(function(db){
        console.log("db");
    })
    .catch(function(err){
        console.log(err);
    });
    
    
let userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const userModel = mongoose.model("DemoUserModel" , userSchema);

const newUser = new userModel({
    name: "Arpi",
    email: "ashish675@gmail.com",
    phno: "89654" //it is ignored
})

newUser
    .save()
    .then(function(){
        console.log("A user is saved in demousermodels");
    })
    .catch(function(err)
    {
        console.log(err)
    });

app.listen(3000,function(){
   console.log("App is listening 3000")
    });
