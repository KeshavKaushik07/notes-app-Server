const express = require("express");
const verifiy = require("../middleware/verifiyToken");
const isAdmin = require("../middleware/checkAdmin");
const { getAllUsers, deleteUser, changeProfile, changePasswod, getAllNotes, getUserNote, deleteNote, deleteAllNote } = require("../controller/adminController");

const router = express.Router();

router.get("/users", verifiy, isAdmin, getAllUsers);
router.delete("/user/:id", verifiy, isAdmin, deleteUser);
router.patch("/user/:id/profile", verifiy, isAdmin, changeProfile);
router.patch("/user/:id/password", verifiy, isAdmin, changePasswod);

router.get("/user/:id/note", verifiy, isAdmin, getUserNote);
router.delete("/user/:id/note/:noteId", verifiy, isAdmin, deleteNote);

router.get("/notes", verifiy, isAdmin, getAllNotes);
router.delete("/note/deleteall", verifiy, isAdmin, deleteAllNote);

module.exports = router;