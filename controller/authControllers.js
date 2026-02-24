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

            return ;
        }

        const exist = await userModel.findOne({ email });

        if (exist) {
            resp.status(500).send({
                success: false,
                message: "User Aready Exists"
            });

            return ;
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

const login = async (req,resp) =>{
   try{

     const { email , password } = req.body;
    
    if( !email || !password)
    {
        resp.status(500).send({
            success : false,
            message : "All field Requires"
        });

        return ;
    }

    const user = await userModel.findOne({ email });

    if(!user)
    {
        resp.status(500).send({
            success : false,
            message : "Email doesn't Exist"
        });

        return ;
    }

    // const compare = await bcryptjs.compare(password,user.password);

    if(password != user.password)
    {
        resp.status(500).send({
            success : false,
            message : "Incrroct Password"
        });

        return ;
    }

    user.pssword = undefined;
    resp.status(200).send({
        success : true,
        message :  "Login Successfuly",
        user
    })

   }
   catch(err){
    resp.status(500).send({
        success : false,
        message: "error in login API",
        err
    })
   }
}

module.exports = {registration,login};