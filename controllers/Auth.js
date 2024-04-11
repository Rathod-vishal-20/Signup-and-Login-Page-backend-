const User = ("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()




// Routes for the sign upp

exports.signup = async (req , res) =>{
    try{
        // get data
        const {name , email , password , role} = req.body

        // check already exist or not 
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({

                success:false,
                message:"User already exist"
            })
        }

        // secure password and checking
        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password , 10)
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        // create a enrtu fot the user

        const user = await User.create({
            name, email , password , role
        })

        // return response 

        return res.status(200).json({
            success:true,
            message:"User signup Successfully "
        })

        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            
            success:false,
            message:"User cannot be registered"

        })
    }
}


// login routes 

exports.login = async (req , res) => {
    try{
        // fetch the data 
        const {email , password} = req.body
        // for the passwored 
        if(!email || !password) {
            return res.status(400).josn({
                success:false,
                message:"Please fill all the details carefully"
            })
        }

        // checking the email 
        const user = await User.findOne({email})

        // if not rigistered 

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered"
            })
        }

        // if rigistered
        const payload ={
            email: user.email,
            id: user._id,
            role: user.role,
        }

        /// verify the password and genrerate jwt token 
        if(await bcrypt.compare(password , user.password)){

            // password is match
            let token = jwt.sign(payload ,
            process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        })

        user.token = token;

        user.password = undefined;

        // create a options 
        const options = {
            expires: new Date( Date.now() + 30000),
            httpOnly:true
        }

        res.cookie("token" , token , options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged In Successfully "
        })
        

        }
        else{
            // password is not match
            return res.status(403).json({
                success:false,
                message:"Pasword id incorrect "
            })
        }
        

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,

            message:"User cannot be logged , please check the user name and password"
        })
    }
}


