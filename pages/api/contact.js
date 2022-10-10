import { validEmail } from "../../lib/validation";
import { MongoClient } from 'mongodb'

async function handler(req, res){
    if(req.method === 'POST'){
        const { email, name, message } = req.body;
        if(!validEmail(email)){
            return res.status(422).json({message: 'Invalid Email Address'})
        }
        const messageData = {email, name, message};
        let client;
        
        try{
            client = await MongoClient.connect("mongodb+srv://nextUser:AE639639639@cluster0.a0jad.mongodb.net/?retryWrites=true&w=majority")
            
        }catch{
            return res.status(500).json({message:'Could not connect to database.'})
        }
        try {
            const result = await client.db('next-blog').collection('messages').insertOne(messageData)
            messageData.id = result.insertedId;
        } catch {
            client.close();
            return res.status(500).json({message: 'Could not store message.'})
        }
        client.close();
        return res.status(201).json({message: 'Message createad', data: messageData})
    }
}

export default handler;