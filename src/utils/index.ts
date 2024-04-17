import jwt from 'jsonwebtoken'
import { encryptPassword, comparePassword } from './passwordUtils';

const JWT_KEY = process.env.JWT_KEY || 'SECRET';

const generateToken = (userId: string): string => {
    const token = jwt.sign({userId}, JWT_KEY, {expiresIn: '1d'});
    return token;
}

export {
    generateToken,
    encryptPassword,
    comparePassword,
}