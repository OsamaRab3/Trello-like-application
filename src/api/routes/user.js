
const express = require('express')
const router= express.Router();
const authController = require('../controllers/authController')
const {validationSignup,validationLogin} = require('../../middlewares/validation')


router.route('/login')
    .post(validationLogin(),authController.login)

router.route('/signup')
    .post(validationSignup(),authController.signup)

module.exports = router;