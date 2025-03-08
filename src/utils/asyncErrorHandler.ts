




import { Request,Response,NextFunction } from "express";

function asyncErrorHandler<T> (func:(req: Request, res: Response, next: NextFunction) => Promise<T>){

    return  (req:Request, res:Response, next:NextFunction) =>{
        Promise.resolve(func(req,res,next)).catch(error => next(error));
    }
}

export default asyncErrorHandler ;