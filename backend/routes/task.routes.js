import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { addTask, getTask, getTasks, deleteTask, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

// Apply verifyUser middleware to all routes in this router.
// This means the verifyUser middleware function will be executed first for every incoming request
// to any route defined below. Only if verifyUser passes (e.g., the user is authenticated or authorized),
// will the request proceed to the corresponding route handler.
router.use(verifyUser);

router.post("/add-task", addTask);

router.get("/task/:taskId", getTask);

router.get("/tasks", getTasks);

router.delete("/task/:taskId", deleteTask);

router.put("/task/:taskId", updateTask);

export default router;
