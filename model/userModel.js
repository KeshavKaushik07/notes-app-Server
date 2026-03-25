const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema(
    {
        title: String,
        content: String
    },
    { timestamps: true }
);

const userModel = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "userName is Required"]
        },
        email: {
            type: String,
            required: [true, "email is Required"],
            unique : true
        },
        password: {
            type: String,
            required: [true, "password is Required"]
        },
        phone: {
            type: Number,
            required: [true, "phone is Required"]
        },
        profile: {
            type: String,
            required: [true, "profile is Required"],
            default: "client",
            enum: ["client", "admin", "vendor", "driver"]
        },
        verified: {
            type : Boolean,
            default: false
        },
        notes: {
            type : [noteSchema],
            default : []
        }
    }
);

module.exports = mongoose.model("users", userModel);
