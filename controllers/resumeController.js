const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel')
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page!", resume })
})


//------------Education--------------


exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" })
})

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body, };
    await student.save();
    res.json({ message: "Education Updated!" })
}) 

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);

    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" })
}) 


//-----------------Job---------------------


exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Job Added!" })
})

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid);

    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex], ...req.body, };
    await student.save();
    res.json({ message: "Job Updated!" })
}) 

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.jobs.filter((i) => i.id !== req.params.jobid);

    student.resume.jobs = filteredjob;
    await student.save();
    res.json({ message: "Job Deleted!" })
}) 


//-----------------Internships-----------------

exports.addintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Internship Added!" })
})

exports.editintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internIndex = student.resume.internships.findIndex((i) => i.id === req.params.internid);
    student.resume.internships[internIndex] = { ...student.resume.internships[internIndex], ...req.body, };
    await student.save();
    res.json({ message: "Internship Updated!" })
}) 

exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredintern = student.resume.internships.filter((i) => i.id !== req.params.internid);

    student.resume.internships = filteredintern;
    await student.save();
    res.json({ message: "Internship Deleted!" })
}) 


//-----------------Responsibilities-----------------


exports.addresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Responsibility Added!" })
})

exports.editresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const respIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.respid);
    student.resume.responsibilities[respIndex] = { ...student.resume.responsibilities[respIndex], ...req.body, };
    await student.save();
    res.json({ message: "Responsibility Updated!" })
}) 

exports.deleteresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredresp = student.resume.responsibilities.filter((i) => i.id !== req.params.respid);

    student.resume.responsibilities = filteredresp;
    await student.save();
    res.json({ message: "Responsibility Deleted!" })
}) 


//-----------------Courses-----------------

exports.addcours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Courses Added!" })
})

exports.editcours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const coursIndex = student.resume.courses.findIndex((i) => i.id === req.params.coursid);
    student.resume.courses[coursIndex] = { ...student.resume.courses[coursIndex], ...req.body, };
    await student.save();
    res.json({ message: "Courses Updated!" })
}) 

exports.deletecours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredcours = student.resume.courses.filter((i) => i.id !== req.params.coursid);

    student.resume.courses = filteredcours;
    await student.save();
    res.json({ message: "Courses Deleted!" })
}) 


//-----------------Projects-----------------

exports.addproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Project Added!" })
})

exports.editproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projIndex = student.resume.projects.findIndex((i) => i.id === req.params.projid);
    student.resume.projects[projIndex] = { ...student.resume.projects[projIndex], ...req.body, };
    await student.save();
    res.json({ message: "Project Updated!" })
}) 

exports.deleteproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredproj = student.resume.projects.filter((i) => i.id !== req.params.projid);

    student.resume.projects = filteredproj;
    await student.save();
    res.json({ message: "Project Deleted!" })
}) 


//-----------------Skills-----------------

exports.addskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skills Added!" })
})

exports.editskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex((i) => i.id === req.params.skillid);
    student.resume.skills[skillIndex] = { ...student.resume.skills[skillIndex], ...req.body, };
    await student.save();
    res.json({ message: "Skills Updated!" })
}) 

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredskill = student.resume.skills.filter((i) => i.id !== req.params.skillid);

    student.resume.skills = filteredskill;
    await student.save();
    res.json({ message: "Skills Deleted!" })
}) 


//-----------------Accomplishments-----------------

exports.addacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishments Added!" })
})

exports.editacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const acompIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.acompid);
    student.resume.accomplishments[acompIndex] = { ...student.resume.accomplishments[acompIndex], ...req.body, };
    await student.save();
    res.json({ message: "Accomplishments Updated!" })
}) 

exports.deleteacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredacomp = student.resume.accomplishments.filter((i) => i.id !== req.params.acompid);

    student.resume.accomplishments = filteredacomp;
    await student.save();
    res.json({ message: "Accomplishments Deleted!" })
}) 
