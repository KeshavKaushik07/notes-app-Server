const userModel = require("../model/userModel");
const mongoose = require("mongoose");

const createNote = async (req, resp) => {
    try {

        const { userId } = req.user;
        const { title, content } = req.body;

        const newNote = {
            _id: new mongoose.Types.ObjectId(),
            title,
            content
        }

        const user = await userModel.findByIdAndUpdate(userId, {
            $push: {
                notes: newNote
            }
        });

        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        resp.status(200).send({
            success: true,
            message: "Note Created",
            noteId: newNote._id
        });

    } catch (err) {
        resp.status(500).send({
            success: false,
            message: "error in Create API",
            err
        })
    }
}

const readNote = async (req, resp) => {
    try {

        const { userId } = req.user;

        // console.log(userId);

        const user = await userModel.findById(userId);

        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        // console.log(user);

        resp.status(200).send({
            success: true,
            messgae: "All Documents",
            notes: user.notes
        })

    }
    catch (err) {
        resp.status(500).send({
            success: false,
            message: "error in Read API",
            err
        })
    }
}

const updateNote = async (req, resp) => {
    try {

        const { userId } = req.user;

        const { noteId, title, content } = req.body;

        // console.log(userId,noteId);

        const user = await userModel.findOneAndUpdate(
            {
                _id: userId,
                "notes._id": noteId
            },
            {
                $set: {
                    "notes.$.title": title,
                    "notes.$.content": content
                }
            },
            {
                new : true
            }
        );// .$. is used to say update only that filterd by upper find function if miss $ mongo db update the whole notes ;
        // console.log(user);

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "user not found"
            });
        }

        const updatedNote = user.notes.find( note => note._id.toString() === noteId );// extracting the updatednote from user object 

        // console.log(updatedNote);

        resp.status(200).send({
            success : true,
            message : "Note updated successfully",
            noteId,
            updatedNote
        })

    } catch (err) {
        resp.status(500).send({
            success: false,
            message: "error in Update API"
        })
    }
}

const deleteNote = async (req, resp) => {
    try{

        const { userId } = req.user;

        const { noteId } = req.body;

        console.log(userId,noteId);

        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                $pull : {
                    notes : { _id : noteId}
                }
            }
        );

        console.log(user);

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "user not found"
            });
        }

        resp.status(200).send({
            success : true,
            message : "note Delete successfully"
        });

    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in Delete API",
            err
        })
    }
}

const deleteAllNotes = async (req, resp) => {
}


module.exports = { createNote, readNote, updateNote, deleteNote, deleteAllNotes }