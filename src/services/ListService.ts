// const CustomError = require("../utils/CustomError");
// const prisma = require("../utils/prisma");
// const { getBoardId } = require("./boardService");



import CustomError from "../utils/CustomError";
import prisma from "../utils/prisma";
import boardService from './boardService'

const createList = async(name:string,boardId:string)=>{

    const [board,list] =  await Promise.all([
        boardService.getBoardId(boardId),
        prisma.list.create({
            data:{
                name,
                boardId:parseInt(boardId)
            }
        })
    
    ])
    
    if (!board){
        throw new CustomError("Boars Not found",404)
    }

    return list;

}

const GetList =async(listId:string)=>{
    const list = await prisma.list.findUnique({
        where:{
            id:parseInt(listId)
        },
        select:{
            id:true,
            name:true,
            cards:{
                select:{
                    id:true,
                    name:true,
                }
            },
            createdAt:true,
            updatedAt:true
        }
    })

    if(!list){
        throw new CustomError('List Not Found',404)
    }

    return list ;
}

const GetAllLists = async (boardId:string)=>{

    const [board,lists] = await Promise.all([
        boardService.getBoardId(boardId),
        prisma.list.findMany({
            where:{
                boardId:parseInt(boardId)}
            })
    ])

    if (lists.length === 0){
        throw new CustomError("Board not contine lists",404)
    }
    return lists;

}

const UpdateList = async(listId:string, name: string) => {
    await GetList(listId);
    
    const updated = await prisma.list.update({
        where: { 
            id: parseInt(listId) 
        },
        data: { 
            name 
        }
    });

    return updated;
}
const DeleteList = async (listId: string)=>{

    await GetList(listId);
    await prisma.list.delete({
        where:{
            id:parseInt(listId)
        }
    })
    return true
}

const getListWithCards = async(listId: string) => {
    const [list, cards] = await Promise.all([
        GetList(listId),
        prisma.list.findUnique({
            where: {
                id: parseInt(listId)
            },
            include: {
                cards: true
            }
        })
    ]);

    return cards;
}

const CardCountList = async(listId: string) => {
    const [list, count] = await Promise.all([
        GetList(listId),
        prisma.card.count({
            where: {
                listId: parseInt(listId)
            }
        })
    ]);

    if (count === 0) {
        throw new CustomError("This list doesn't contain any cards", 404)
    }

    return count;
}

const clearList  = async (listId: string)=>{
    await GetList (listId);

    await prisma.card.deleteMany({
        where:{
            listId:parseInt(listId)
        }
    })

    return true
}

export default {
    createList,
    GetList,
    GetAllLists,
    getListWithCards,
    UpdateList,
    DeleteList,
    CardCountList,
    clearList
}