


import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    email:{
        required: true,
        type: 'string'
    },
    password:{
        required: true,
        type:'string',
        min:6
    },
   isEmailVerified:{
    type:'boolean',
    default: false
   }
});
export const User = mongoose.model('User',userSchema);




