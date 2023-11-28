


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


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  assignees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  ],
  project: {
    type: String, 
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["normal", "high", "medium"],
    default: "normal",
  },
  fileAttachment: {
    type: String, 
  },
});

export const Task = mongoose.model("Task", taskSchema);
