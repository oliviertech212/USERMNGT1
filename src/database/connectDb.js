
import mongoose from "mongoose";

export const  connectDb= async()=>{
    await mongoose.connect(process.env.DB).then(
          console.log("Database connected ") 
     ).catch((error)=>{
    console.log("failed to connect",error.message)
});
}