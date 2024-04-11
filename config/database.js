const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => console.log("DB connected Successfully"))
    .catch((error) =>{
        console.log(error)
        console.log("Issue in DB connection ")
        process.exit(1)
    })
}