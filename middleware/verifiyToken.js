const JWT = require("jsonwebtoken");

module.exports = async (req, resp, next) => {
    try {
        // console.log("header key : ", req?.headers["authorization"]);
        // console.log(req.cookies.refreshToken);
        const authorization = req.headers["authorization"];

        if(!authorization)
        {
            return resp.status(401).send({
                success : false,
                message : "NO token Provided"
            });
        }

        const token = authorization.split(" ")[1];
        // console.log("token is : ", token);

        JWT.verify(token, process.env.ACCESS_JWT_SECRET, (err, decode) => {
            if (err) {
                return resp.status(401).send({
                    success: false,
                    message: "un-authorize user"
                });
            } else {
                // console.log("decode id is : ", decode);
                req.user = { userId : decode.id } ;
                next();
            }
        })

    } catch (err) {
        resp.status(500).send({
            success: false,
            message: "error in middleware API",
            err
        })
    }
}