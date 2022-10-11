
import { MongoClient } from 'mongodb';

export async function connectToDatabase(){
    const client = await MongoClient.connect("mongodb+srv://nextUser:AE639639639@cluster0.a0jad.mongodb.net/?retryWrites=true&w=majority");
    
    return client
}