const CustomError = require('../utils/CustomError');
const prisma = require('../utils/prisma');
const {GetList} = require('./ListService')

const createCard = async (name,description,listId)=>{
    await GetList(listId);
    const card = await prisma.card.create({
        data:{
            name,
            listId:parseInt(listId),
            description: description || null,
        }
    })

    return card;
};

const getCard = async (cardId, listId) => {
    await GetList(listId);
    
    const card = await prisma.card.findFirst({
        where: {
            id: parseInt(cardId),
            listId: parseInt(listId)
        },
        select: {
            id: true,         
            name: true,
            description: true,
            dueDate: true,     
            listId: true,
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,    
                    updatedAt: true,     
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            checklists: true,   
            activities: true,    
            createdAt: true,   
            updatedAt: true    
        }
    });

    if (!card) {
        throw new CustomError('Card Not Found', 404);
    }

    return card;
}


const  getAllCardsList = async (listId)=>{

 const [list,cards] =await  Promise.all([
        GetList(listId),
        prisma.card.findMany({
            where:{
                listId:parseInt(listId)
            }
    
        })
    ])

    if (cards.length===0){
        throw new CustomError("THer is no Cards in this lists",404)
    }

}

const UpdateCard = async (cardId, name, description) => {
    await getCard(cardId);
    
    const updateData = {};
    
    if (name !== undefined) {
        updateData.name = name;
    }
    
    if (description !== undefined) {
        updateData.description = description;
    }
    
    const updatedCard = await prisma.card.update({
        where: {
            id: parseInt(cardId)
        },
        data: updateData
    });

    return updatedCard;
}
const deleteCard = async(cardId) =>{

    await getCard(cardId);

    const deleteCard = await prisma.card.delete({
        where:{
            id:parseInt(cardId)
        }
    })

    return true;

}

module.exports = {
    deleteCard,
    UpdateCard,
    getAllCardsList,
    getCard,
    createCard

}