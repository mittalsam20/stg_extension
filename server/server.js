//Packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cookieParser = require('cookie-parser');


//Intialization
const app = express();
var corsOptions = {
        origin: true,
        credentials: true
    }
    // Server Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//Importing Routes
const Port = process.env.Port || 5000;
const authRoute = require("./routes/auth");
const recRoute = require("./routes/recordingurl")
const noteRoute = require("./routes/noteurl")

//DB Connection
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}, () => console.log("Database Connected successfully..!!"));
const recording = require("./models/recordingmodels")


//Multer Portion
app.use("/recording", express.static("upload"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload")
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
        // limits: { fileSize: 1024 * 1024 * 5 }
})

// Upload API
app.post("/app/upload", upload.single("recording"), (req, res) => {
    console.log(req.file);
    const recording_url = `http://localhost:5000/recording/${req.file.filename}`;
    const newrecording = new recording({
        recordingFileName: req.file.filename,
        recordingPath: req.file.path,
        recordingUrl: recording_url
    })
    console.log(req.file.path);
    console.log(recording_url);
    newrecording.save().then(data => {
            res.status(200).json(data);
            // console.log(json(data));
        }).catch(error => { res.status(500).json(error) })
        // res.status(200).json({
        //     success: 1,
        //     recording_url: recording_url,
        //     recodring_path:req.file.path
        // })
})

//Calling Of All Routes
app.use("/app", authRoute);
app.use("/app", recRoute);
app.use("/app", noteRoute);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    })
})

//Server Listening At This Port
app.listen(Port, () => { console.log(`Server has started listening on Port ${Port}`) })