import CustomeError from '../utils/CustomError'
import { Request,Response ,NextFunction} from "express";

const  errorHandlers = {
    NotFound:(req :Request ,res: Response,next:NextFunction)=>{
      const error = new CustomeError (`Cannot find ${req.originalUrl} on this server`,404)
      next(error)
    },
    globalError:(error:CustomeError, req:Request, res:Response, next:NextFunction) => {
  
        error.statusCode = error.statusCode || 500;
        error.status = error.status || "error"
      
        res.status(error.statusCode).json({
          status:error.status,
          message:error.message
        })
    },
    
}

export default errorHandlers;