import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/tasksController.js";

const router = express.Router();

// All tasks
router.get("/", getTasks);

// Create a task
router.post("/", createTask);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
