import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";
import analyticsRoutes from "./routes/analytics.js";
import pool from "./config/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",   // dev
      "https://clear-path-chi.vercel.app/tasks" // prod
    ],
    methods: "GET,POST,PUT,PATCH,DELETE"
  })
);
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false });
  }
});


// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
