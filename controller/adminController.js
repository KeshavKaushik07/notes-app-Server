const userModel = require("../model/userModel");
const bcryptjs = require("bcryptjs");


const getAllUsers = async (req, resp) => {
    try{

        const user = await userModel.find().select("-notes");// get every user and exclude notes key of every user

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "users not found"
            });
        }

        // console.log(user);

        resp.status(200).send({
            success : true,
            message : "all user data",
            user
        });
    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in getting all users",
            err
        })
    }
}
const deleteUser = async (req, resp) => {
    try{

        const { id } = req.params;

        const user = await userModel.findByIdAndDelete(id);
        // console.log(user);
        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "users not found"
            });
        }

        resp.status(200).send({
            success : true,
            message : `delete user with id:${id}`
        });

    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in deleting user",
            err
        })
    }
}
const changeProfile = async (req, resp) => {
    try{

        const { id } = req.params;

        const user = await userModel.findById(id);

        // if(req.user.userId == id )
        // {
        //     return resp.status(400).send({
        //         success : false,
        //         message : "can't change your own role"
        //     })
        // }// prevent admin to change their own role

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "users not found"
            });
        }

        if(user.profile === "client")
        {
            await userModel.findByIdAndUpdate(
                id,
                {
                    profile : "admin"
                },
                {
                    new : true
                }
            );
        }else {
            await userModel.findByIdAndUpdate(
                id,
                {
                    profile : "client"
                },
                {
                    new : true
                }
            );
        }

        resp.status(200).send({
            success : true,
            message : `change profile to ${user.profile === "client" ? "admin":"client"}`
        });

    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in changing profile",
            err
        })
    }
}
const changePasswod = async (req, resp) => {
    try{

        const { id } = req.params;
        const { password } = req.body;

        // console.log(password);

        if(!password || password.length < 6)
        {
            return resp.status(401).send({
                success : false,
                message : "password lenght should be greater than 6"
            })
        }

        const newPassword = await bcryptjs.hash(password,10);

        const user = await userModel.findByIdAndUpdate(
            id,
            {
                $set:{
                    password:newPassword
                }
            }
        );

        if(!user)
        {
            return resp.status(404).send({
                success : false,
                message : "user not found"
            });
        }

        resp.status(200).send({
            success : true,
            message : `password updated of id ${id}`
        });
        
        
    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in changing password",
            err
        })
    }
}
const getAllNotes = async (req, resp) => {
    try{

        const notes = await userModel.aggregate([
            { $unwind : "$notes" },
            { $replaceRoot : { newRoot : "$notes" } }
        ]);

        if(!notes)
        {
            return resp.status(404).send({
                success : false,
                message : "Can't get notes"
            });
        }

        resp.status(200).send({
            success : true,
            message : "All Notes",
            notes
        })
    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in getting all notes",
            err
        })
    }
}
const getUserNote = async (req, resp) => {
    try{

        const { id } = req.params;

        const userNote  = await userModel.findById(id).select("notes");

        if(!userNote)
        {
           return resp.status(404).send({
                success : false,
                message : "Can't get notes"
            }); 
        }

        resp.status(200).send({
            success : true,
            message : `notes of user id : ${id}`,
            notes : userNote.notes
        });
    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in getting note",
            err
        })
    }
}
const deleteNote = async (req, resp) => {
    try{

        const { id , noteId } = req.params;

        const note = await userModel.findByIdAndUpdate(
            id,
            {
                $pull : {
                    notes : { _id : noteId }
                }
            }
        );

        if(!note)
        {
            return resp.status(404).send({
                success : false,
                message : "failed to delete note"
            }); 
        }

        resp.status(200).send({
            success : true,
            message : "note deleted"
        })
    }catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in deleting note",
            err
        })
    }
}
const deleteAllNote = async (req, resp) => {
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in deleting all notes",
            err
        })
    }
}

module.exports = { getAllUsers, deleteUser, changeProfile, changePasswod, getAllNotes, getUserNote, deleteNote, deleteAllNote }