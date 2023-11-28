

import express from "express";
import  dotenv from "dotenv";
import { connectDb } from "./database/connectDb.js";
import inderoutes from "./routes/index.routes.js";
import  cors  from 'cors';

const app = express();
app.use(express.json());
const corsOptions ={
    origin: process.env.FR || 'http://localhost:5173',
    credentials:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
dotenv.config()

const port = process.env.PORT || 3000;




app.use('/api/user',inderoutes);

app.listen(port,async()=>{
    try {
        await connectDb();
        console.log(`Server is running on http://localhost:${port} `); 
    } catch (error) {
        console.log(error.message);
    }
    
});