const express = require("express");

const router = express.Router();

router.post("/register",(res)=>{console.log("hello")});
router.post("/login",(res)=>{console.log("hello")});

module.exports = router;