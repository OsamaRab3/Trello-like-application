
import { body } from "express-validator";
const validationSignup = () => {
    return [
        body('name').notEmpty()
        .withMessage('name is required'),
        body('email').notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),
        body('password').notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')

    ]
};

const validationLogin = () => {
    return [
        body('email').notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),
        body('password').notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ]
}

const validationBoard = ()=>{
    return [
        body("name").notEmpty()
        .withMessage("Name Board are required")
    ]
}

export default {
    validationSignup,
    validationLogin,
    validationBoard

};
