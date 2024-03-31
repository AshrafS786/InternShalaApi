const express = require('express');
const router = express.Router();
const { homepage, currentEmploye, employesignup, employesignin, employesignout, employesendmail, employeforgetlink, employeresetpassword, employeupdate, employeavatar } = require('../controllers/employeController');
const { isAuthenticated } = require('../middlewares/auth');

//GET /
router.get('/', homepage);

//POST /employe
router.post('/current', isAuthenticated, currentEmploye);

//POST /signup
router.post('/signup', employesignup);

//POST /signin
router.post('/signin', employesignin);

//GET /student/signout
router.get('/signout', isAuthenticated, employesignout);

//POST /send-mail
router.post('/send-mail', employesendmail);

//GET /forget-link/:employeid
router.get('/forget-link/:id', employeforgetlink);

//POST /reset-password/:employeid
router.post('/reset-password/:id', isAuthenticated, employeresetpassword);

//POST /update/:employeid
router.post('/update/:id', isAuthenticated, employeupdate);

//POST /employe/avatar/:employeid
router.post('/employe/avatar/:id', isAuthenticated, employeavatar);
 
module.exports = router; 