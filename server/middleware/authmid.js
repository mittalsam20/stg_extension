const jwt = require("jsonwebtoken")
const user = require("../models/signupmodels")

const AuthMid = async(req, res, next) => {
    try {
        const token = req.cookies.stgUserToken;
        const verifyToken = jwt.verify(token, "illbethebestworkharder")
        console.log("verify token ki value true ya falise", verifyToken)
        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) { throw new Error("User Not Found..!!") }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (err) {
        res.status(401).send("UnAuthorized:No Token is Being Provided.")
        console.log(err);
    }
}
module.exports = AuthMid;