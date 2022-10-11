import {hash, compare} from 'bcryptjs'


export async function hashPassword(password){
    return hash(password, 12);
}
export async function validatePassword(password, hashedPassword){
    return await compare(password, hashedPassword)
}