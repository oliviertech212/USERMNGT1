

import { Schema } from "mongoose";
import  {Task} from "../database/models/Models.js";
import excel from "exceljs";

export class TaskService {
  static async createTask(req, res) {
    try {
      const newTask = await Task.create(req.body);
      return res.status(200).json({ status: "success", task: newTask });
    } catch (error) {
        console.log(error);
      return res.status(400).json({ status: "fail", message: error.message });
    }
  }

    static async getAllTasks(req, res) {
      try {
        const { page = 1, limit = 5, sortBy = "startDate", sortOrder = "asc" } = req.query;
  
        const options = {
          sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
          limit: parseInt(limit),
          skip: (page - 1) * parseInt(limit),
        };
  
        const tasks = await Task.find().sort(options.sort).limit(options.limit).skip(options.skip);
        res.status(200).json(tasks);
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    }
  

    static getTaskById = async (req,res) => {
        try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
        } catch (error) {
        console.log(error);  
        }
    }
    static DeleteTaskById = async (req,res) => {
        try {
        await Task.findOneAndDelete( req.params.id);
        res.status(200).json("task has been deleted");    
        } catch (error) {
        console.log(error.message);
        }
    }

    static UpdateTask = async (req,res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id,{$set : req.body}) 
        res.status(200).json("task updated")
        } catch (error) {
       console.log(error);
    }
    }

static  download = async (req, res) => {
  const tasks=await Task.find();
    let tutorials = [];

    tasks.forEach((obj) => {
      tutorials.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        priority: obj.priority,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "priority", key: "priority", width: 10 },
    ];

    worksheet.addRows(tutorials);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tasks.xlsx"
    );

    await workbook.xlsx.write(res);
      res.status(200).end();
  
};

 
}