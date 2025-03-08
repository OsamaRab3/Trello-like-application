
import  prisma  from "../utils/prisma";
import CustomError from "../utils/CustomError";
import bcrypt from 'bcryptjs'


const createUser = async (name:string, email:String, password:String) => {


    const existingUser = await prisma.user.findUnique({
        where: {email: String(email)  }
    });

    if (existingUser) {
        throw new CustomError('Email already exists', 400);
    }

    const hashedPassword = bcrypt.hash(String(password), 10)


    const user = await prisma.user.create({
        data: {
            name,
            email:String(email),
            password: String(hashedPassword),
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    });

    return { id: user.id, name: user.name, email: user.email };

};


const getUser = async (email:String, password:String) => {

    const user = await prisma.user.findUnique({
        where: {
            email: String(email)
        }, select: {
            id: true,
            password: true,
            name: true,

        }
    })
    if (!user) {
        throw new CustomError(" invild email or password ", 400)
    }

    const isPasswordValid =  bcrypt.compare(String(password), user.password);

    if (!isPasswordValid) {
        throw new CustomError('Invalid email or password', 400);
    }
    return { id: user.id, name: user.name, email };

}

const getUserId = async (userId:String)=>{
    await prisma.user.findUnique({
        where:{
            id:parseInt(String(userId))
        },
        select:{
            id:true,
            name:true,


        }
    })
}
export default {
    createUser,
    getUser,
    getUserId
};
