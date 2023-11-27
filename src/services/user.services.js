

import { User } from "../database/models/Models.js";
import * as argon2 from 'argon2';
import { emailValidator } from "../../utils/helpers/emailValidator.js";
import Jwt  from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";

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
            const message = `${process.env.BASE_URL}/api/user/verify/${newUser.id}/${token}`;
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


        static async userSignin(req, res) {
            try {
                if(!req.body.email || !req.body.password) return next(ApiError.NotFound("please input values"))
                const usereXisting=await User.findOne({email:req.body.email});
               
    
                if(!usereXisting){
                    throw new Error (` User with ${req.body.email} not found `);
                }
                if (! usereXisting.isEmailVerified) {
                   return res.json({status:"fail",message:" please verify your account"})
                }
                const userpassword =await argon2.verify(usereXisting.password,req.body.password);                
                if(userpassword){
                    const token = Jwt.sign(
                        {
                            id:usereXisting._id,
                            email:usereXisting.email,
                            isEmailVerified:usereXisting.isEmailVerified
                        },process.env.secret,{expiresIn:'1d'}
                    );
                    return res
                    .status(200)
                    .json({ status: "success", token: token });
                }
    
                return res.status(404).json({ status: "fail", message:"invalid credentials"});
                
            } catch (error) {
                return res
                    .status(400)
                    .json({ status: "fail",message: error.message });
            }
        }
    
        static async emailVerification  (req,res){
            try {
              const user = await User.findOne({ _id: req.params.id });
              if (!user) return res.status(400).send("Invalid link");
              const token = Jwt.verify(req.params.token, process.env.secret, async (err, usertoken) => {
                if (err) res.status(403).json(`Token is not valid! ${err}`);
               if (user.id== usertoken.id && user) {
                await User.updateOne({ _id: user._id,isEmailVerified: true });
                return  res.status(200).json({status:"success", message:"email verified sucessfully"});
               }
              });
              if (!token) return res.status(400).send("Invalid link");
          
            } catch (error) {
              res.status(400).send("An error occured");
            }
        }

    
   static async userProfileView(req, res){
    try {
        const user= await req.user;
        if (!user) return res.status(401).json({status:"error", message:"user not found"});
        if (user)
        return  res.status(200).json({status:"success", user:user});

    } catch (error) {
        
    }

   }



   static async edituserProfile(req, res){
    try {
        const user= await req.user;
        if(!req.body.email || !req.body.password) return next(ApiError.NotFound("please input values"))
        const usereXisting=await User.findOne({email:user.email});
        if(!usereXisting){
            throw new Error (` User with ${req.body.email} not found `);
        }
        if (! usereXisting.isEmailVerified) {
           return res.json({status:"fail",message:" please verify your account"})
        }
      
        if (!user) return res.status(401).json({status:"error", message:"user not found"});
        const usertoudate= await User.findByIdAndUpdate(user.id,{email : req.body}) 
        res.status(200).json({status:"success", user: usertoudate});
        } catch (error) {
       console.log(error);
    }
   }


    
    
}