


import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type:String,
        min:6
    },
   isEmailVerified:{
    type:Boolean,
    default: false
   }
});
export const User = mongoose.model('User',userSchema);




