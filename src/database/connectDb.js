
import mongoose from "mongoose";

export const  connectDb= async()=>{
    await mongoose.connect('mongodb://127.0.0.1/userMngt').then(
          console.log("Database connected ") 
     ).catch((error)=>{
    console.log("failed to connect",error.message)
});
}