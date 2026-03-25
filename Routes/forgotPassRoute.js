const express= require("express");
const { forgotPass , OTP, resetPass} = require("../controller/forgotPassController");

const router = express.Router();

router.post("/forgot",forgotPass);

router.post("/otp",OTP);

router.post("/resetpass",resetPass);

module.exports = router;