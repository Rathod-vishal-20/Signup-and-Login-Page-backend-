const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = ( req , res , next ) => {
    try{
        // extract jwt token and cookies 

        console.log("cookie" , req.cookies.token );
        console.log("body" , req.body.token );

        const token = req.body.token || req.cookies.token || req.header("Authorization ").replace("Bearer" , "")
            if(!token || token === undefined){
                return res.status(401).json({
                    success:false,
                    message:"Token is missing"
                })
            }

            /// verify the token 

            try{
                const payload = jwt.verify(token , process.env.JWT_SECRET);
                console.log(payload);
                req.user = payload

            }
            catch(error){
                return res.json({
                    success:false,
                    message:"Token is invalid"
                })
            }
            next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({

            success:false,
            message:"Something went wrong while verifing the token ",
            error:error.message
        })
    }
}


// verifying the student 

exports.isStudent = (req , res , next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for the student"
            })
        }
        next()
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User is not defined"
        })
    }
}

/// checking for the admin

exports.isAdmin = ( req , res , next) => {
    try{
        if(req.uer.role !== "Admin"){
            return res.status(500).json({
                success:false,
                message:"This is the protected route fot the admin"
            })
        }
        next()

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}