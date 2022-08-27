const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require('express-session')

//const bodyParser = require('body-parser')
const app = express();
require("dotenv").config();

const userRoutes = require('./routes/userRoutes')

//app.use(express.urlencoded({extended: true}));
//app.use(cookieParser());
app.use(express.json());

app.use(session({secret: process.env.SESSION_KEY,saveUninitialized:false,resave:false}))
app.use(morgan('dev'));
// app.use((req,res,next)=>{
//     res.set('Cache-Control','no-store')
//     next()
//   })
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST", "PUT"],
        credentials: true,
    })
);

app.use("/api/user", userRoutes)

mongoose.connect("mongodb://localhost:27017/lapscart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((err) => {
    console.log(err.message, "DB Connection Failed");
})




app.listen(5000, () => {
    console.log("server is running on port 5000");
});

module.exports = app;