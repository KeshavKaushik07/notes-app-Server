const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");


const registration = async (req, resp) => {
    try {
        const { userName, email, password, phone, profile } = req.body;

        if (!userName || !email || !password || !phone || !profile) {
            resp.status(500).send({
                success: false,
                message: "All fields are Reqired"
            });
        }

        const exist = await userModel.findOne({ email });

        if (exist) {
            resp.status(500).send({
                success: false,
                message: "User Aready Exists"
            });
        }

        // const hashPasswod = await bcryptjs.hash(password,10);

        const user = await userModel.create({ userName, email, password, phone, profile });
        user.password = undefined;

        resp.status(200).send({
            success: true,
            message: "successfully Registered",
            user
        })

    } catch (err) {
        console.log("error in register", err);
        resp.status(500).send({
            success: false,
            message: "error in register API",
            err
        })
    }
}

module.exports = {registration};