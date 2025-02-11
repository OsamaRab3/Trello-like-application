
const { getUserId } = require('./userService')
const { getCard } = require('./cardServices')
const prisma = require('../utils/prisma')
const CustomError = require('../utils/CustomError')

// const check if user already in card 
const checkUser = async (cardId, userId) => {

    const [user, card] = await Promise.all([
        getUserId(userId),
        getCard(cardId)
    ])

    const member = await prisma.cardMember.findFirst({
        where: {
            userId: parseInt(userId),
            cardId: parseInt(cardId)
        },
    })

    return !member;

}
const addMember = async (cardId, userId) => {

    const isNotMember = await checkUser(cardId, userId);

    if (!isNotMember) {
        throw new CustomError("User already in Card", 409);
    }

    const newUser = await prisma.cardMember.create({
        data: {
            cardId: parseInt(cardId),
            userId: parseInt(userId)
        }
    })

    return newUser;
}
const getCardMember = async (cardId)=>{

    const [card,members] =  await Promise.all([
        getCard(cardId),
        prisma.cardMember.findMany({
            where:{
                cardId:parseInt(cardId)
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })
    ])
    if(members.length === 0){
        throw new CustomError("This card empity from users",404);
    }

    return members;

}

module.exports = {
    getCardMember,
    addMember,
    
}