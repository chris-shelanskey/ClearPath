import pool from "../config/db.js";

export const getAnalytics = async (req, res) => {
  try {
    // 1. Total tasks
    const totalTasks = await pool.query("SELECT COUNT(*) FROM tasks");

    // 2. Completed tasks
    const completedTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'completed'"
    );

    // 3. Pending tasks
    const pendingTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'pending'"
    );

    // 4. Overdue tasks
    const overdueTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE due_date < CURRENT_DATE AND status != 'completed'"
    );

    // 5. Priority distribution
    const priorityDist = await pool.query(
      "SELECT priority_score, COUNT(*) FROM tasks GROUP BY priority_score ORDER BY priority_score"
    );

    // 6. Tasks due in the next 7 days
    const tasksNext7Days = await pool.query(
      `SELECT COUNT(*) 
       FROM tasks 
       WHERE due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'`
    );

    res.json({
      total_tasks: totalTasks.rows[0].count,
      completed: completedTasks.rows[0].count,
      pending: pendingTasks.rows[0].count,
      overdue: overdueTasks.rows[0].count,
      priority_distribution: priorityDist.rows,
      due_next_7_days: tasksNext7Days.rows[0].count
    });

  } catch (err) {
    console.error("Analytics error:", err.message);
    res.status(500).json({ error: "Analytics server error" });
  }
};
