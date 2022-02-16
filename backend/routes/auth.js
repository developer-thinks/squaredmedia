const router = require('express').Router()
const User = require("../models/User")

//Register new user :
router.get("/register", async (req,res)=>{
    const user = await new User({
        username : "samsquare",
        email : "sam@gmail.com",
        password : "sam@123",
    })

    await user.save();
    res.send("saved")
});

module.exports = router