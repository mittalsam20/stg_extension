//Packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")
const multer = require("multer");

//Intialization
const app = express();
const authRoute = require("./routes/auth");
const Port = process.env.Port || 5000;
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database Connected successfully..!!"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

//Multer Portion
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been Uploaded")
})

//Calling Of All Routes
app.use("/app", authRoute);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    })
})

//Server Listening At This Port
app.listen(Port, () => { console.log(`Server has started listening on Port ${Port}`) })