const express= require("express");
const { forgotPass , resetPass} = require("../controller/forgotPassController");

const router = express.Router();

router.post("/forgot",forgotPass);

router.post("/reset",resetPass);

module.exports = router;