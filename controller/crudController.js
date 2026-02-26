const userModel = require("../model/userModel");
const mongoose = require("mongoose");

const createNote = async (req,resp) => {
    try{

        const { userId , title , content } = req.body;

        const newNote = {
            _id : new mongoose.Types.ObjectId() ,
            title , 
            content
        }

    await userModel.findByIdAndUpdate(userId,{
        $push : {
            notes : newNote
        }
    });

    resp.status(200).send({
        success : true,
        message : "Note Created",
        noteId : newNote._id
    });

    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in Create API",
            err
        })
    }
}

const readNote = async (req,resp) => {
}

const updateNote = async (req,resp) => {
}

const deleteNote = async (req,resp) => {
}


module.exports = { createNote , readNote , updateNote , deleteNote }