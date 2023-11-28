
import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate:  Joi.date().required(),
  assignees:Joi.array().items(Joi.string()).required(),
  project : Joi.string().min(0).required(),  
  fileAttachment:Joi.string().required(),
  priority: Joi.string().required(),
  description: Joi.string().min(30).max(100).required()
});

export default taskSchema;

