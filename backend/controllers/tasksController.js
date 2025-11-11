import pool from "../config/db.js";
import { calculatePriority } from "../utils/calculatePriority.js";
import { validateTask } from "../utils/validateTask.js";


// GET all tasks
export const getTasks = async (req, res) => {
  try {
    let { sort, order, status, priority, page, limit } = req.query;

    // Default values
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    order = order === "desc" ? "DESC" : "ASC";

    const offset = (page - 1) * limit;

    // Base query
    let query = "SELECT * FROM tasks";
    let conditions = [];

    // Filtering
    if (status) {
      conditions.push(`status = '${status}'`);
    }

    if (priority) {
      conditions.push(`priority = '${priority}'`);
    }

    // Add WHERE conditions if any
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Sorting
    const allowedSortFields = ["due_date", "priority_score", "importance", "created_at"];

    if (sort && allowedSortFields.includes(sort)) {
      query += ` ORDER BY ${sort} ${order}`;
    } else {
      query += " ORDER BY id ASC"; // default
    }

    // Pagination
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query);
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// POST a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, importance, effort, due_date } = req.body;

    // Validate input
    const errors = validateTask({ title, importance, effort, due_date });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Proceed if valid...
    const priority_score = calculatePriority(importance, due_date, effort);

    const result = await pool.query(
      `INSERT INTO tasks (title, description, importance, effort, due_date, priority_score)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, importance, effort, due_date, priority_score]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, importance, effort, due_date, status } = req.body;

    // Validate input
    const errors = validateTask({ title, importance, effort, due_date });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const priority_score = calculatePriority(importance, due_date, effort);

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           importance = $3,
           effort = $4,
           due_date = $5,
           status = $6,
           priority_score = $7
       WHERE id = $8
       RETURNING *`,
      [
        title,
        description,
        importance,
        effort,
        due_date,
        status,
        priority_score,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deleted: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
