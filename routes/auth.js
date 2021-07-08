const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const user = require("../models/signupmodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthMid = require("../middleware/authmid");
router.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");

// || !req.body.firstName ||  !req.body.lastName

router.use(cors());


router.post("/signup", async(req, res) => {
    try {

        if (!req.body.emailId ||
            !req.body.password ||
            !req.body.fullName
        ) {
            return res
                .status(400)
                .json({ message: "Please Fill All The Details..!!" });
        }
        //  else if (req.body.password.length < 8) {
        //     return res.status(400).json({ message: "Minimum Password Length Is 8 Characters" })
        // }
        else if (req.body.password.length < 8) {
            return res
                .status(400)
                .json({ message: "Minimum Password Length Is 8 Characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const userExist = await user.findOne({ emailId: req.body.emailId });
        if (userExist) {
            res.status(400).json({ message: "Email-Id Already Registered..!!" });
        }
        const newUser = new user({
            fullName: req.body.fullName,
            emailId: req.body.emailId,
            password: hashedPass,
        });
        console.log(req.body.emailId);
        newUser
            .save()
            .then((data) => {
                res.status(200).json({
                    message: "Registration Successfully..!!",
                    data,
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/login", async(req, res) => {
    try {
        let token;
        // console.log(req.data)
        console.log(req.body);
        console.log(req.body.logEmail);
        console.log(req.body.logPass);
        if (!req.body.logEmail || !req.body.logPass) {
            return res
                .status(400)
                .json({ message: "Please Fill All The Details..!!" });
        }
        const userLogin = await user.findOne({ emailId: req.body.logEmail });
        if (userLogin === null) {
            console.log("inside null");
            res
                .status(400)
                .json({ message: "Email-Id Not Recognized Please SignUp With Us" });
        } else {
            console.log("User Does Exist..!!", userLogin.emailId);
            const userLogPass = await bcrypt.compare(
                req.body.logPass,
                userLogin.password
            );
            // res.header('Access-Control-Allow-Origin', "*");
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            // res.header('Access-Control-Allow-Credentials', true);
            if (userLogin && userLogPass) {
                token = await userLogin.generateAuthToken();
                console.log("Server is getting token", token);
                res.cookie("stgUserToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                console.log("Token Stored As Cookie");
                console.log("user's Id", userLogin._id);
                res.status(200).json({ message: "Login SuccessFull..!!" });

            } else {
                console.log("PassWord Entered is", userLogPass);
                return res.status(400).json({ error: "InCorrect Password" });
            }
        }
    } catch (err) {
        console.log(err);
    }
});


router.get("/main", AuthMid, (req, res) => {
    console.log("entered in about");
    res.status(200).send(req.rootUser);
});

router.get("/logout", (req, res) => {
    console.log("loging out initiated");
    res.clearCookie("stgUserToken", { path: "/" });
    res.status(200).send("User LoggedOut");
});
module.exports = router;