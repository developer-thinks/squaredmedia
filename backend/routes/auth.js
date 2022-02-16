const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Register new user :
router.post("/register", async (req,res)=>{
    
    try {
        // generating secure password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user with secure password
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })

        //saving user to database
        const user = await newUser.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(422).json({error})
    }
});

module.exports = router