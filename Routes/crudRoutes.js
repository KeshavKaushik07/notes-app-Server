const express = require("express");
const { createNote , readNote , updateNote , deleteNote } = require("../controller/crudController");

const router = express.Router();

router.get("/read",readNote);

router.post("/create",createNote)

router.post("/update",updateNote)

router.post("/delete",deleteNote)

module.exports = router;