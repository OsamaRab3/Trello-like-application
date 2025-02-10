const CustomError = require('../../utils/CustomError')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')
const userService = require('../../services/userService');
const {generateAccessToken} = require('../../utils/generateJWT')

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomError("Missing email or password", 400));
    }

    const user = await userService.getUser(email, password);

    if (!user) {
        return next(new CustomError("Invalid email or password", 400));
    }

    const token =  generateAccessToken(user.id)

    return res.status(200).json({
        status: "success",
        data: {
            user,
            token
        },
        
    });
});


const signup =  asyncErrorHandler(async(req,res,next)=>{
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return next(new CustomError("Invalid Data",400));
    }
    const user = await userService.createUser(name,email,password)

    const token =  generateAccessToken(user.id)
    return res.status(201).json({
        status:"success",
        data:{
            user,
            token
        },
        
    })
})


module.exports = {
    login,
    signup
}