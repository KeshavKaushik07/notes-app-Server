const express = require("express");
const verifiy = require("../middleware/verifiyToken");
const isAdmin = require("../middleware/checkAdmin");
const { getAllUsers, deleteUser, changeProfile, changePasswod, getAllNotes, getUserNote, deleteNote, deleteAllNote } = require("../controller/adminController");

const router = express.Router();

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id/profile", changeProfile);
router.patch("/user/:id/password", changePasswod);

router.get("/user/:id/note", getUserNote);
router.delete("/user/:id/note/:noteId", deleteNote);

router.get("/notes", getAllNotes);
router.delete("/note/deleteall", deleteAllNote);

module.exports = router;