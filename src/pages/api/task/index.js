/* eslint-disable import/no-anonymous-default-export */
import TaskModel from "../../../models/TaskModel";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create task
  if (method === "POST") {
    try {
      const newTask = await new TaskModel(req.body).save();
      res
        .status(201)
        .json({ data: newTask, message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  if (method === "GET") {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json({ data: tasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      console.log(error);
    }
  }
};
