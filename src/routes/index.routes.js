

import  express  from "express";
const inderoutes= express.Router();

import { UserService } from "../services/user.services.js";
import  {verifyUser } from "../middlewares/verifyUser.js";



inderoutes.post('/register/',UserService.RegisterUser);
inderoutes.post('/login/',UserService.userSignin);
inderoutes.get('/profile/',verifyUser,UserService.userProfileView);
inderoutes.get('/verify/:id/:token',UserService.emailVerification); 
inderoutes.patch('/edit/',verifyUser,UserService.edituserProfile);

export default inderoutes;