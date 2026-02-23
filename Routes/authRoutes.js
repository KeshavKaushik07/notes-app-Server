const express = require("express");
const {registration} = require("../controller/authControllers");

const router = express.Router();

router.post("/register",registration);
router.post("/login",(res)=>{console.log("hello")});

module.exports = router;