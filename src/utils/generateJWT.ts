
import * as jwt from "jsonwebtoken";
import config from '../config';

const JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET;
const JWT_SECRET = config.JWT_SECRET;
 

function generateAccessToken(userId: number) {

    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "15m" });
}


function generateRefreshToken(userId: number){
    return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};



export default {
    generateAccessToken,
    generateRefreshToken
}
