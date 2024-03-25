const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel')

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    try {
        res.json({ message: "homepage" });

    } catch (error) {
        res.json(error)
    }
})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    res.status(201).json(student);
})

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

    if (!student) {
        return next(
            new ErrorHanler(
                "User not found with this email address",
                404
            )
        )
    }

    const isMatch = student.comparepassword(req.body.password);

    if (!isMatch) return next(
        new ErrorHanler(
            "Wrong credentials",
            500
        )
    );


    res.status(201).json(student);
})

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {

})