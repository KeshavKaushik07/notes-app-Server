const express = require("express");
const verifiy = require("../middleware/verifiyToken");
const isAdmin = require("../middleware/checkAdmin");
const { getAllUsers, deleteUser, changeProfile, changePasswod, getAllNotes, getUserNote, deleteNote, deleteAllNote } = require("../controller/adminController");

const router = express.Router();

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id/profile", changeProfile);
router.patch("/user/:id/password", changePasswod);

router.get("/notes", getAllNotes);
router.get("/user/:id/note", getUserNote);
router.delete("/note/:id", deleteNote);

router.delete("/note/deleteall", deleteAllNote);

module.exports = router;