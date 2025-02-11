const boardService = require('../../services/boardService')
const {validationResult} =require('express-validator')
const CustomError = require('../../utils/CustomError')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')

const createBoard = asyncErrorHandler(async(req,res,next)=>{
    const error = validationResult(req)
    if (!error.isEmpty()){
       return next(new CustomError(error.array()[0].msg),400)
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

const getBoardId  = asyncErrorHandler(async(req,res,next)=>{
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

const deleteBoard = asyncErrorHandler(async(req,res,next)=>{

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

const addUser = asyncErrorHandler(async(req,res,next)=>{
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