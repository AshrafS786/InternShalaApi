const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel')
const ErrorHandler = require("../utils/ErrorHandler");

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const {resume} = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page!", resume})
})