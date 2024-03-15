import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db('CabSystem');
        const collection = db.collection("graphRef");

        const docs = await collection.find({}).toArray();
        delete docs[0]._id;
        return docs[0];

    } catch (error) {
        console.log(error);
    }
}

async function getRates() {
    try {
        await client.connect();
        const db = client.db('CabSystem')
        const collection = db.collection("Cabs");

        const docs = await collection.find({}).toArray();
        delete docs[0]._id;
        return docs[0];
    } catch (error) {
        console.log(error);
    }
}

async function setRate(cab, newRate) {
    try {
        await client.connect();
        const db = client.db('CabSystem');
        const collection = db.collection('Cabs');
        await collection.updateOne({}, { $set: { [cab]: newRate } });
    } catch (err) {
        console.error(err);
    }
}


export {main,getRates,setRate}