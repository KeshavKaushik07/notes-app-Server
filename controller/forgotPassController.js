const resetModel = require("../model/resetModel");
const userModel = require("../model/userModel");
const nodeMailer = require("nodemailer");
const bcryptjs = require("bcryptjs");


const forgotPass = async (req, resp) => {

    try {
        const { email } = req.body;

        const exists = await userModel.findOne({ email });

        if (!exists) {
            resp.status(404).send({
                success: false,
                message: "user doesn't exists"
            });

            return;
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        await resetModel.findOneAndUpdate(
            { email },
            { OTP },
            { upsert: true, new: true }
            // upsert : true if exist than udate if not that create
            //new : true always return updeated one
        );

        // console.log(resetDoc);

        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: "k68542919@gmail.com",
            to: email,
            subject: "OTP verification",
            text: `your OTP is ${OTP} , This OTP expires in 5 minutes `,
        });

        // console.log("email Sent");

        resp.status(200).send({
            success: true,
            message: "OTP sent Successfully",
            to: email
        })
    }
    catch (err) {
        resp.status(500).send({
            success: false,
            message: "error in forgotPass API",
            err
        });
    }


}

const resetPass = async (req, resp) => {
    try{
        const { email , OTP , password } = req.body;

    const resetEntry = await resetModel.findOne({ email });

    if(!resetEntry)
    {
        resp.status(500).send({
            success: false,
            message: "OTP Expired"
        });
        
        return ;
    }

    if ( OTP != resetEntry.OTP )
    {
         resp.status(500).send({
            success: false,
            message: "Wrong OTP"
        });

        return ;
    }
     
    const hashPassword = await bcryptjs.hash(password,10);

    await userModel.updateOne({ email },{ password : hashPassword});

    resp.status(200).send({
        success : true,
        message : "passwod reset successfully"
    })

    }
    catch(err)
    {
        resp.status(500).send({
            success: false,
            message: "error in resetPass API",
            err
        });   
    }

}

module.exports = { forgotPass, resetPass }