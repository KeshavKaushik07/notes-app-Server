const express = require("express");
const verifiy = require("../middleware/verifiyToken");
const isAdmin = require("../middleware/checkAdmin");
const { getAllUsers, deleteUser, changeProfile, changePasswod, getAllNotes, getUserNote, deleteNote, deleteAllNote } = require("../controller/adminController");

const router = express.Router();

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/user/:id/profile", changeProfile);
router.patch("/user/:id/password", changePasswod);

router.get("/notes", getAllNotes);
router.get("/users/:id/notes", getUserNote);
router.delete("/notes/:id", deleteNote);

router.delete("/notes/deleteall", deleteAllNote);

module.exports = router;