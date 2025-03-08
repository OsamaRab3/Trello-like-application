
import express from 'express'
import authController  from '../controllers/authController'
import  Validation from '../../middlewares/validation'

const router= express.Router();


router.route('/login')
    .post(Validation.validationLogin(),authController.login)

router.route('/signup')
    .post(Validation.validationSignup(),authController.signup)

module.exports = router;