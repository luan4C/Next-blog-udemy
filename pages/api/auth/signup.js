import { connectToDatabase } from "../../../lib/db"
import { hashPassword } from "../../../lib/auth";

export default async function handler(req,res){
    if(req.method === 'POST'){
        
        const { email, password  } = req.body    
        if(email.length == 0 || password.length == 0){
            return res.status(400).json({message:"Invalid user credentials."})
        }
        const dbCLient = (await connectToDatabase()).db('next-auth');
        const existingUser = await dbCLient.collection('user').findOne({email:email})
        if(!existingUser){
            const result = await dbCLient.collection('user').insertOne({
                email,
                password: await hashPassword(password) 
            });
        }else{
            return res.status(422).json({message: 'Email Already Exists.'})
        }
    
        res.status(201).json({message: 'User Created!'})
    }
}