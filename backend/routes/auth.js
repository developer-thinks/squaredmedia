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

router.post('/login', async (req,res)=>{
    try {
        //checking if the user by her email(which we receive from postman)
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json("user Not found")

        //now if user present check the password is correct :
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        !validatePassword && res.status(400).json("wrong credentials")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router