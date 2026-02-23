const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB".bgMagenta);
    }catch(err)
    {
        console.log("somthing went wrong during connecting to DB"+err.bgRed)
    }
}

module.exports = connectDB;