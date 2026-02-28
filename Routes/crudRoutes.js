const express = require("express");
const { createNote , readNote , updateNote , deleteNote , deleteAllNotes } = require("../controller/crudController");
const verifiy = require("../middleware/verifiyToken");

const router = express.Router();

router.get("/readnote",verifiy,readNote);

router.post("/createnote",verifiy,createNote);

router.post("/updatenote",verifiy,updateNote);

router.post("/deletenote",verifiy,deleteNote);

router.post("/deleteallnote",verifiy,deleteAllNotes);

module.exports = router;