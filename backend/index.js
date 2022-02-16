const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")


dotenv.config()

//mongo connection :
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("connected to database");
})

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute)


app.listen(5000,()=>{
    console.log("Server started");
})