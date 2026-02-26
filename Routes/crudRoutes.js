const express = require("express");
const { createNote , readNote , updateNote , deleteNote } = require("../controller/crudController");
const verifiy = require("../middleware/verifiyToken");

const router = express.Router();

router.get("/read",readNote);

router.post("/create",verifiy,createNote)

router.post("/update",updateNote)

router.post("/delete",deleteNote)

module.exports = router;