const userModel = require("../model/userModel");
const mongoose = require("mongoose");

const createNote = async (req,resp) => {
    try{

        const {  userId } = req.user;
        const { title , content } = req.body;

        const newNote = {
            _id : new mongoose.Types.ObjectId() ,
            title , 
            content
        }

   const user =  await userModel.findByIdAndUpdate(userId,{
        $push : {
            notes : newNote
        }
    });

    if(!user){
        return resp.status(404).send({
            success : false,
            message : "user not found"
        })
    }

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
    try{

        const { userId } = req.user;

        // console.log(userId);

        const user = await userModel.findById( userId );

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "user not found"
            })
        }

        // console.log(user);

        resp.status(200).send({
            success : true,
            messgae : "All Documents",
            notes : user.notes
        })

    }
    catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in Read API",
            err
        })
    }
}

const updateNote = async (req,resp) => {
}

const deleteNote = async (req,resp) => {
}

const deleteAllNotes = async (req,resp) => {
}


module.exports = { createNote , readNote , updateNote , deleteNote , deleteAllNotes }