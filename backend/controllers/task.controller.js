import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    if (!title || !description) {
      throw new Error("All fields are required.");
    }

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const newTask = await Task({ title, description, userId });
      newTask.save();
      return res.status(201).json({
        success: true,
        task: newTask,
        message: "Task added successfully",
      });
    } else {
      return res.status(400).json({ success: false, error: "ID is not valid" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
};

export const getTask = async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ success: false, error: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    return res
      .status(200)
      .json({ success: true, task, message: "Task retrieved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", details: error.message });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const response = await Task.find({ userId });

    if (response.length === 0) {
      return res
        .status(200)
        .json({ success: true, task: response, message: "No added task" });
    }

    return res
      .status(200)
      .json({ success: true, task: response, message: "All tasks" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.response });
  }
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { taskId } = req.params;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, error: "invalid ID" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
    });
    return res
      .status(200)
      .json({ success: true, updatedTask, message: "Task updated successfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, error: "invalid ID" });
    }
    const response = await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      task: response,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
