

import express from "express";
import  dotenv from "dotenv";
import { connectDb } from "./database/connectDb.js";
import inderoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());
dotenv.config()

// const port = process.env.PORT || 3000;
const port=5000



app.use('/api/user',inderoutes);

app.listen(port,async()=>{
    try {
        await connectDb();
        console.log(`Server is running on http://localhost:${port} `); 
    } catch (error) {
        console.log(error.message);
    }
    
});