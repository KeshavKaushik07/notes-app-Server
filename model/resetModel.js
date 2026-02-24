const mongoose = require("mongoose");

const resetModel = new mongoose.Schema(
    {
       email : {
        type : String,
        required : [true , "email is Require"]
       },
       OTP : {
        type : Number,
        required : [true,"Otp is required"]
       }
    },
    { timestamps: true }
);

resetModel.index(
    { createdAt : 1 },
    { expireAfterSeconds : 300 }
)

module.exports = mongoose.model("resetModel",resetModel);