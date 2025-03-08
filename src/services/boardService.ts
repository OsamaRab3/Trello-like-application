

// create board ,update board ,delete board ,get all in board 
// public pr private board 
// board member => add member ,delete member if admin ,
// --------------
// Create Board  => done 
// Read/Get Board (single board) => done 
// List Boards (all boards) => done 
// Update Board  => done 
// Delete Board    => done 
// Add Board Member => done
// Remove Board Member
// Update Board Member Role
// Get Board Members
// Change Board Visibility (public/private)

// const CustomError = require("../utils/CustomError");
// const prisma = require("../utils/prisma")

import CustomError from "../utils/CustomError";
import prisma from "../utils/prisma";

const createBoard = async (name:string ,ownerId:string)=>{
    const board = await prisma.board.create({
        data:{
            name,
            ownerId:parseInt(ownerId)
        }
    })

    return board;
}

const getBoardId = async (boardId:string)=>{
    const board = await prisma.board.findUnique({
        where:{
            id:parseInt(boardId)
        }
    })
    if(!board){
        throw new CustomError("Board Not found",404)
    }

    return board;
}

const deleteBoardId = async (boardId:string)=>{

    const board =  await getBoardId(boardId);

   const deleted = await prisma.board.delete({
        where:{
            id:board.id
        }
    })

    return deleted
}
// in update board we can update name , toggle public 
const updateBoard = async (boardId:string)=>{
    const board = await getBoardId(boardId);
    // update what? 
    // name 
}

const addUser = async (boardId:string, userId:string) => {

    const [board, member] = await Promise.all([
        getBoardId(boardId),
        prisma.boardMember.findFirst({
            where: {
                userId: parseInt(userId),
                boardId: parseInt(boardId)
            }
        })
    ]);
    if (member) {
        throw new CustomError("Member already exists", 409)
    }

    return prisma.boardMember.create({
        data: {
            userId: parseInt(userId),
            boardId: parseInt(boardId)
        }
    });
}

// Update Board Member Role

// const updateRole = async (boardId,userId)=>{
//     await getBoardId(boardId);

//     const member = await prisma.boardMember.findFirst({
//         where: {
//             userId: parseInt(userId),
//             boardId: parseInt(boardId)
//         },
//         select:{
//             board:{
//                 o
//             }
//         }
//     });

//     if (!member){
//         throw new CustomError("USer Not Found",404)
//     }

// }
// const getLists = async (boardId) => {
//     const board = await prisma.board.findUnique({
//         where: {
//             id: parseInt(boardId)
//         },
//         select: {
//             lists: true 
//         }
//     });

//     if (!board) {
//         throw new CustomError("Board Not Found", 404);
//     }

//     return board.lists; 
// };

// const addMember = async (boardId,memberId)=>{
//     const
// }


export default {
    getBoardId,
    createBoard,
    deleteBoardId,
    updateBoard,
    addUser
    // getLists
}