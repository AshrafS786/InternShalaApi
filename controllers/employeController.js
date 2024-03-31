const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require('../models/employeModel');
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const path = require('path');
const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    try {
        res.json({ message: "Secure Employe Homepage!" });
    } catch (error) {
        res.json(error)
    }
})

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe });

})

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    res.status(201).json(employe);
    sendToken(employe, 201, res);
})

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();

    if (!employe)
        return next(
            new ErrorHandler(
                "User not found with this email address",
                404
            )
        )

    const isMatch = employe.comparepassword(req.body.password);

    if (!isMatch) return next(new ErrorHandler("Wrong credentials", 500));
    sendToken(employe, 200, res);

});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!" })
})

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec();

    if (!employe)
        return next(
            new ErrorHandler(
                "User not found with this email address",
                404
            )
        )

    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;

    sendmail(req, res, next, url);
    employe.resetPasswordToken = '1';
    await employe.save();
    res.json({ employe, url });
})

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if (!employe)
        return next(
            new ErrorHandler(
                "User not found with this email address",
                404
            )
        )
    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save();
    } else {
        return next(
            new ErrorHandler(
                "Invalid Reset Password Link! Please try again.",
                500
            )
        )
    }
    res.status(200).json({
        message: "Password has been successfully changed.",
    })
})

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    employe.password = req.body.password;
    await employe.save();
    sendToken(employe, 201, res);
})

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Employe Updated Successfully!",
    });

})


exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    const file = req.files.organizationlogo;
    const modifiedFieldName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (employe.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationlogo.fileId)
    }

    const {fileId, url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFieldName,
    })

    employe.organizationlogo = {fileId, url};
    await employe.save();
    res.status(200).json({ 
        success: true,
        message: "Profile Updated Successfully!"
     })

})


//-----------------Internship---------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const internships = await new Internship(req.body);
    internships.employe = employe._id;
    employe.internships.push(internships._id);
    await internships.save();
    await employe.save();
    res.status(201).json({success: true, internships});
})

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
    const {internships} = await Employe.findById(req.id).populate("internships").exec();
    res.status(200).json({success: true, internships});
})

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
    const internships = await Internship.findById(req.params.id).exec();
    res.status(200).json({success: true, internships});
})


//-----------------Job---------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const jobs = await new Job(req.body);
    jobs.employe = employe._id;
    employe.jobs.push(jobs._id);
    await jobs.save();
    await employe.save();
    res.status(201).json({success: true, jobs});
})

exports.readjob = catchAsyncErrors(async (req, res, next) => {
    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
    res.status(200).json({success: true, jobs});
})

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.findById(req.params.id).exec();
    res.status(200).json({success: true, jobs});
})






