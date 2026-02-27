const express = require("express");
const { createNote , readNote , updateNote , deleteNote , deleteAllNotes } = require("../controller/crudController");
const verifiy = require("../middleware/verifiyToken");

const router = express.Router();

router.get("/read",verifiy,readNote);

router.post("/create",verifiy,createNote);

router.post("/update",verifiy,updateNote);

router.post("/delete",verifiy,deleteNote);

router.post("/deleteall",verifiy,deleteAllNotes);

module.exports = router;