// const boardService = require('../../services/boardService')
// const {validationResult} =require('express-validator')
// const CustomError = require('../../utils/CustomError')
// const asyncErrorHandler = require('../../utils/asyncErrorHandler')

import { validationResult } from 'express-validator'
import { Request,Response,NextFunction } from 'express'
import boardService from '../../services/boardService'
import CustomError from '../../utils/CustomError'
import asyncErrorHandler from '../../utils/asyncErrorHandler'



const createBoard = asyncErrorHandler(async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
    const error = validationResult(req)
    if (!error.isEmpty()){

        throw new CustomError((error.array()[0].msg),400)
    }
    const {ownerId} = req.params;
    const {name} = req.body;
    const newBoard = await boardService.createBoard(name,ownerId);

    console.log(newBoard)

    return res.status(201).json({
        status:"success",
        data:{
            newBoard
        }
    })

})

const getBoardId  = asyncErrorHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {boardId} = req.params;

    if (!boardId){
        return  next(new CustomError("Board Id Is Requird",400))
    }
    const board = await boardService.getBoardId(boardId)


    res.status(200).json({
        status:"success",
        data:{
            board
        }
    })

})

const deleteBoard = asyncErrorHandler(async(req:Request,res:Response,next:NextFunction)=>{

    const {boardId} = req.params;
    if (!boardId){
       return  next(new CustomError("Board Id Is Requird",400))
    }

    const deleted = await boardService.deleteBoardId(boardId);

    if(!deleted){
        next(new CustomError("failed to delete Board",500))
    }

    return res.status(200).json({
        status:"success",
        message:"Board deleted successfully"
        
    })
})

const addUser = asyncErrorHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {boardId,userId} = req.params;
    if (!boardId||!userId){
        return next(new CustomError("Invalid Data",400))
    }


    const newMember =  await boardService.addUser(boardId,userId);
    return res.status(201).json({
        status:"success",
        data:{
            newMember
        }
    })
})


module.exports= {
    createBoard,
    getBoardId,
    deleteBoard,
    addUser
}