const prisma = require('../utils/prisma');
const CustomError = require('../utils/CustomError');
const bcrypt = require('bcryptjs')

const createUser = async (name, email, password) => {


    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new CustomError('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    });

    return { id: user.id, name: user.name, email: user.email };

};


const getUser = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }, select: {
            id: true,
            password: true,
            name: true,

        }
    })
    if (!user) {
        throw new CustomError(" invild email or password ", 400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new CustomError('Invalid email or password', 400);
    }
    return { id: user.id, name: user.name, email };

}

const getUserId = async (userId)=>{
    await prisma.user.findUnique({
        where:{
            id:parseInt(userId)
        },
        select:{
            id:true,
            name:true,


        }
    })
}
module.exports = {
    createUser,
    getUser,
    getUserId
};
