require("dotenv").config({path: "./.env"})
const express = require('express');

const app = express();
//db connection
require('./models/database').connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("dev")); //tiny

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 * 7
    // }
}))
app.use(cookieParser());
// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload())

//routes
app.use('/user', require("./routes/indexRoutes"));
app.use('/resume', require("./routes/resumeRoutes"));

//error handlers
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
    next(new ErrorHandler
        (`Requested URL Not Found: ${req.url}`, 404));
})
app.use(generatedErrors)


app.listen(process.env.PORT, () => {
console.log(`Server app listening on port ${process.env.PORT}`);
});
