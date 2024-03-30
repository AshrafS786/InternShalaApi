const express = require('express');
const router = express.Router();
const { resume, addeducation, editeducation, deleteeducation, addjob, editjob, deletejob, addintern, editintern, deleteintern, addresp, editresp, deleteresp, addcours, editcours, deletecours, addproj, editproj, deleteproj, addskill, editskill, deleteskill, addacomp, editacomp, deleteacomp } = require('../controllers/resumeController');
const { isAuthenticated } = require('../middlewares/auth');

//GET /
router.get('/', isAuthenticated, resume);

//-----------------Education-----------------
//POST
router.post("/add-edu", isAuthenticated, addeducation)

//POST
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

//POST
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)


//-----------------Job-----------------
//POST
router.post("/add-job", isAuthenticated, addjob)

//POST
router.post("/edit-job/:jobid", isAuthenticated, editjob)

//POST
router.post("/delete-job/:jobid", isAuthenticated, deletejob)


//-----------------Internships-----------------
//POST
router.post("/add-intern", isAuthenticated, addintern)

//POST
router.post("/edit-intern/:internid", isAuthenticated, editintern)

//POST
router.post("/delete-intern/:internid", isAuthenticated, deleteintern)


//-----------------Responsibilities-----------------
//POST
router.post("/add-resp", isAuthenticated, addresp)

//POST
router.post("/edit-resp/:respid", isAuthenticated, editresp)

//POST
router.post("/delete-resp/:respid", isAuthenticated, deleteresp)


//-----------------Courses-----------------
//POST
router.post("/add-cours", isAuthenticated, addcours)

//POST
router.post("/edit-cours/:coursid", isAuthenticated, editcours)

//POST
router.post("/delete-cours/:coursid", isAuthenticated, deletecours)


//-----------------Projects-----------------
//POST
router.post("/add-proj", isAuthenticated, addproj)

//POST
router.post("/edit-proj/:projid", isAuthenticated, editproj)

//POST
router.post("/delete-proj/:projid", isAuthenticated, deleteproj)


//-----------------Projects-----------------
//POST
router.post("/add-skill", isAuthenticated, addskill)

//POST
router.post("/edit-skill/:skillid", isAuthenticated, editskill)

//POST
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill)


//-----------------Accomplishments-----------------
//POST
router.post("/add-acomp", isAuthenticated, addacomp)

//POST
router.post("/edit-acomp/:acompid", isAuthenticated, editacomp)

//POST
router.post("/delete-acomp/:acompid", isAuthenticated, deleteacomp)


module.exports = router; 