
import CustomError from '../../utils/CustomError'
import  asyncErrorHandler from '../../utils/asyncErrorHandler'
import userService  from '../../services/userService'

import  generateJWT  from '../../utils/generateJWT'
import { Request,Response,NextFunction } from 'express'
const {validationResult}= require('express-validator')

const login = asyncErrorHandler(async (req:Request, res:Response, next:NextFunction):Promise<Response> => {

    const error = validationResult(req)
    if(!error.isEmpty()){
        // next(new CustomError(error.array()[0].msg, 400));
        throw new CustomError(error.array()[0].msg, 400)
        // return;
    }
    
    const { email, password } = req.body;

    const user = await userService.getUser(email, password);

    if (!user) {
         throw new CustomError("Invalid email or password", 400);
    }

    const token =  generateJWT.generateAccessToken(user.id)

    return res.status(200).json({
        status: "success",
        data: {
            user,
            token
        },
        
    });
});


const signup =  asyncErrorHandler(async (req:Request, res:Response, next:NextFunction)=>{

    const error = validationResult(req)
    if(!error.isEmpty()){
        throw new CustomError((error.array()[0].msg),400);
       
    }

    const {name,email,password} = req.body;

    const user = await userService.createUser(name,email,password)

    const token =  generateJWT.generateAccessToken(user.id)
    return res.status(201).json({
        status:"success",
        data:{
            user,
            token
        },
        
    })
})


export default {
    login,
    signup
}