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
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.a0jad.mongodb.net/?retryWrites=true&w=majority`
        console.log(connectionString)
        try{
            client = await MongoClient.connect(connectionString)
            
        }catch{
            return res.status(500).json({message:'Could not connect to database.'})
        }
        try {
            const result = await client.db(process.env.mongodb_database).collection('messages').insertOne(messageData)
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