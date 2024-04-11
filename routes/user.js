const express = require("express");
const router = express.Router()

const {login , signup} = require("../controllers/Auth")

const {auth , isStudent , isAdmin} = require("../middlewares/auth")


router.post("/login" , login)
router.post("/signup" , signup)

// routes for the testing

router.get("/test" , auth , (res , req) => {
    res.json({
        Success:true,
        message:"Welcome to the protected route for the student "
    })
})

// protected routes

router.get("/admin" ,auth , isAdmin , (req , res) => {
    res.json({
        success:false,
        message:"Welcome to the protected route for the admin "
    })

    router.get("/getEmail" , auth , (req , res) => {
        const id = req.user.id;
        console.log("ID:" , id)
        res.json({
            sussess:false,
            id:id,
            message:"Welcome to email route "
        })
    })
})

module.exports = router 