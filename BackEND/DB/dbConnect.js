import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to DB")
    }catch(err){
        console.log("Could Not connect to DB : "+err);
    }
}

export {connectDb};