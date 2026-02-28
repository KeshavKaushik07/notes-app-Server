const express = require("express");
const { createNote, readNote, updateNote, deleteNote, deleteAllNotes } = require("../controller/crudController");
const verifiy = require("../middleware/verifiyToken");

const router = express.Router();

router.get("/readnote", verifiy, readNote);

router.post("/createnote", verifiy, createNote);

router.put("/updatenote", verifiy, updateNote);

router.delete("/deletenote", verifiy, deleteNote);

router.delete("/deleteallnote", verifiy, deleteAllNotes);

module.exports = router;