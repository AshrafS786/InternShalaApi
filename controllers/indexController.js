const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel')
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    try {
        res.json({ message: "Secure Homepage!" });

    } catch (error) {
        res.json(error)
    }
})

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student});

})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    res.status(201).json(student);
    sendToken(student, 201, res);
})

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

    if (!student)
        return next(
            new ErrorHandler(
                "User not found with this email address",
                404
            )
        )

    const isMatch =student.comparepassword(req.body.password);

    if (!isMatch) return next(new ErrorHandler("Wrong credentials", 500));


    sendToken(student, 200, res);

});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: "Successfully signout!"})
})