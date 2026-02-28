const userModel = require("../model/userModel");

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
        })
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
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in deleting user",
            err
        })
    }
}
const changeProfile = async (req, resp) => {
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in changing profile",
            err
        })
    }
}
const changePasswod = async (req, resp) => {
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in changing password",
            err
        })
    }
}
const getAllNotes = async (req, resp) => {
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in getting all notes",
            err
        })
    }
}
const getUserNote = async (req, resp) => {
    try{}catch(err)
    {
        resp.status(500).send({
            success : false,
            message : "error in getting note",
            err
        })
    }
}
const deleteNote = async (req, resp) => {
    try{}catch(err)
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