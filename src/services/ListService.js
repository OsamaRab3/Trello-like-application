const CustomError = require("../utils/CustomError");
const prisma = require("../utils/prisma");
const { getBoardId } = require("./boardService");


const createList = async(name,boardId)=>{

    const [board,list] =  await Promise.all([
        getBoardId(boardId),
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

const GetList =async(listId)=>{
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

const GetAllLists = async (boardId)=>{

    const [board,lists] = await Promise.all([
        getBoardId(boardId),
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

const UpdateList = async(listId, name) => {
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
const DeleteList = async (listId)=>{

    await GetList(listId);
    await prisma.list.delete({
        where:{
            id:parseInt(listId)
        }
    })
    return true
}

const getListWithCards = async(listId) => {
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

const CardCountList = async(listId) => {
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

const clearList  = async (listId)=>{
    await GetList (listId);

    await prisma.card.deleteMany({
        where:{
            listId:parseInt(listId)
        }
    })

    return true
}

module.exports = {
    createList,
    GetList,
    GetAllLists,
    getListWithCards,
    UpdateList,
    DeleteList,
    CardCountList,
    clearList
}