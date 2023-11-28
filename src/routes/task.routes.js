
import  express  from "express";


import {validate } from "../middlewares/varidatetask.js";
import taskSchema from "../validations/taskvalidation.js";
import { TaskService } from "../services/task.services.js";
const taskroutes= express.Router();

taskroutes.post('/create/',validate(taskSchema),TaskService.createTask);
taskroutes.get('/getAll/',TaskService.getAllTasks);
taskroutes.get('/getone/:id/',TaskService.getTaskById);
taskroutes.delete('/delete/:id/',TaskService.DeleteTaskById);
taskroutes.patch('/update/:id/',TaskService.UpdateTask);
taskroutes.get('/download/',TaskService.download);

export default taskroutes;