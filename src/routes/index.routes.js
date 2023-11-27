

import  express  from "express";
import { Router } from "express";

const inderoutes= express.Router();

import { UserService } from "../services/user.services";

inderoutes.post('/',UserService.RegisterUser);



export default inderoutes;