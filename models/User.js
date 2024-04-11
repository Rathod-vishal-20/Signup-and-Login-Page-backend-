const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin" , "Student" , "Visited"]
    }
})

module.exports = mongoose.model("user", userSchema)