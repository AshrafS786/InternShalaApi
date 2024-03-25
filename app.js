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




//routes
app.use('/', require("./routes/indexRoutes"));

//error handlers
const ErrorHanler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
    next(new ErrorHanler
        (`Requested URL Not Found: ${req.url}`, 404));
})
app.use(generatedErrors)


app.listen(process.env.PORT, () => {
console.log(`Server app listening on port ${process.env.PORT}`);
});
