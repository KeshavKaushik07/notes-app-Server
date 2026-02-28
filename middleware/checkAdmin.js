const userModel = require("../model/userModel");

const isAdmin = async (req,resp,next) => {
    try {

        const { userId } = req.user;

        const user = await userModel.findById( userId );

        if(!user || user.profile !== "admin" ) 
        {
            return resp.status(403).send({
                success : false,
                message : "Access Denied"
            });
        }

        next();
    }
    catch(err)
    {
        resp.staus(500).send({
            success : false,
            message : "error in checkAdmin API",
            err
        })
    }
}

module.exports = isAdmin;