const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//Initializing
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
const user = require("../models/signupmodels");
const AuthMid = require("../middleware/authmid");

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.emailId || !req.body.password || !req.body.fullName) {
      return res
        .status(400)
        .json({ message: "Please Fill All The Details..!!" });
    } else if (req.body.password.length < 8) {
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
    console.log(req.body.emailId, req.body.password, req.body.fullName);
    const newUser = new user({
      fullName: req.body.fullName,
      emailId: req.body.emailId,
      password: hashedPass,
    });
    newUser
      .save()
      .then((data) => {
        res.status(200).json({
          message: "Registration Successfull..!!",
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

router.post("/login", async (req, res) => {
  try {
    let token;
    console;
    if (!req.body.logEmail || !req.body.logPass) {
      return res
        .status(400)
        .json({ message: "Please Fill All The Details..!!" });
    }
    const userLogin = await user.findOne({ emailId: req.body.logEmail });
    if (userLogin === null) {
      res
        .status(400)
        .json({ message: "Email-Id Not Recognized Please SignUp With Us" });
    } else {
      const userLogPass = await bcrypt.compare(
        req.body.logPass,
        userLogin.password
      );
      // res.header('Access-Control-Allow-Origin', "*");
      // res.header('Access-Control-Allow-Credentials', true);
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      if (userLogin && userLogPass) {
        console.log(userLogin, userLogPass);
        token = await userLogin.generateAuthToken();
        res.cookie("stgUserToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: `Login SuccessFull..!!`, id: userLogin._id });
      } else {
        return res.status(400).json({ message: "InCorrect Password" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/resetpass/:id", async (req, res) => {
  try {
    const temp = req.params.id;
    if (temp !== null) {
      console.log(temp);
      const result = await user.findByIdAndUpdate(temp, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Password Updated..!!" });
    } else {
      res.status(404).json({ message: "Something went Wrong..!!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/forgotpass/:emailid", async (req, res) => {
  try {
    const temp = req.params.emailid;
    if (temp !== null) {
      const result = await user.findOne({ emailId: temp });
      if (result) {
        res.status(200).send(result);
      } else {
        res
          .status(404)
          .json({ message: "Email Not Recognized Please Signup With Us..!!" });
      }
    } else {
      res.status(400).json({ message: "Please Fill The Email-Id Field..!!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/main", AuthMid, (req, res) => {
  res.status(200).send(req.rootUser);
});

router.get("/logout", (req, res) => {
  res.clearCookie("stgUserToken", { path: "/" });
  res.status(200).send("User LoggedOut");
});
module.exports = router;
