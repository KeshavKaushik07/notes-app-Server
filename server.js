const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DbConnect/MongooseDB");

dotenv.config();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.text());

app.use("/Notes/api/auth",require("./Routes/authRoutes"));

const port = process.env.PORT || 5000;
app.listen(port ,()=>{
    console.log(`server is running on port ${port}`.bgGreen);
})