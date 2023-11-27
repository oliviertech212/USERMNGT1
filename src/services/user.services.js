

import { User } from "../database/models/Models";
import mongoose from "mongoose";

export class UserService {
    static async RegisterUser(req,res){     
        try {
            const hash=await argon2.hash(req.body.password);
            const usereXisting=await User.findOne({email:req.body.email});
            if(!emailValidator(req.body.email)) return res.status(500).json('enter a valid email');
            if(usereXisting) {
                throw new Error("User already exists");
            }
            const newUser=await User.create({...req.body,password:hash});
            newUser.save();
            
    
            const token = Jwt.sign(
                {
                    id:newUser.id,
                    email:newUser.email
                },process.env.secret,{expiresIn:'2000h'}
            );
            const message = `${process.env.BASE_URL}/user/verify/${newUser.id}/${token}`;
            await sendEmail(newUser.email, "Verify Email", message);
         
             
         
           return res
          .status(200)
          .json({ status: "success",user: newUser ,message:"An Email sent to your account please verify"});
    
            } catch (error) {
                return res
                .status(400)
                .json({ status: "fail",message: error.message });
            }
        }
    
    
}