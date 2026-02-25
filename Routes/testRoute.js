const express = require("express");
const verifiy = require("../middleware/verifiyToken");

const router = express.Router();

router.post("/checkmiddleware",verifiy,(req,resp)=>{
    resp.status(200).send({
        success : true,
        message : "works Fine"
    })
})

module.exports = router;