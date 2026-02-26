const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DbConnect/MongooseDB");
const cookieParser = require("cookie-parser");

dotenv.config();// speading .env file to all server

connectDB();// connecting to Mongo DB

app.use(cors());// handle Corse Error

app.use(cookieParser());//insted of manually getting cookie from raw data we use cookie parser to get  
app.use(express.json());// parse evey json data
app.use(express.text());// parse every text data

app.use("/Notes/api/test",require("./Routes/testRoute"));// Just for Testing
app.use("/Notes/api/auth",require("./Routes/authRoutes"));// for Login , Sign up and to get Refresh Token
app.use("/Notes/api/forgotpass",require("./Routes/forgotPassRoute"));// for forget password and otp Verification 
app.use("/Notes/api/usernote",require("./Routes/crudRoutes"));

const port = process.env.PORT || 5000;
app.listen(port ,()=>{
    console.log(`server is running on port ${port}`.bgGreen);
})