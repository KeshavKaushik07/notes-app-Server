const express = require("express");
const {registration,login,refreshToken} = require("../controller/authControllers");

const router = express.Router();

router.post("/register",registration);
router.post("/login",login);

router.post("/refresh",refreshToken);

module.exports = router;