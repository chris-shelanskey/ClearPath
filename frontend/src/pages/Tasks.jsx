// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState({
    sort: "priority_score",
    order: "desc",
    page: 1,
    limit: 10,
    status: ""
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    importance: 3,
    effort: 1,
    due_date: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = () => {
    setLoading(true);
    setError("");
    fetchTasks(query)
      .then((res) => setTasks(res.data))
      .catch((err) => {
        const msg = err.response?.data?.error || err.message;
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.sort, query.order, query.page, query.status]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "importance" || name === "effort" ? Number(value) : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createTask(form);
      setForm({ title: "", description: "", importance: 3, effort: 1, due_date: "" });
      loadTasks();
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setError(data.errors.join(" "));
      } else {
        setError(data?.error || err.message);
      }
    }
  };

  const handleComplete = async (task) => {
    try {
      await updateTask(task.id, { ...task, status: "completed" });
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const changePage = (delta) => {
    setQuery((prev) => ({
      ...prev,
      page: Math.max(1, prev.page + delta),
    }));
  };

  const setSort = (field, order) => {
    setQuery((prev) => ({
      ...prev,
      sort: field,
      order,
      page: 1,
    }));
  };

  const setStatusFilter = (status) => {
    setQuery((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  return (
    <div className="tasks-shell">
      <div className="tasks-header">
        <div>
          <h1 className="tasks-title">Tasks</h1>
          <p className="tasks-subtitle">Manage and prioritize your work items.</p>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="tasks-error">Error: {error}</div>}

      {/* Add Task Form */}
      <section className="task-form-card">
        <h2 className="section-title">Add Task</h2>
        <form className="task-form" onSubmit={handleCreate}>
          <div className="field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="field">
            <label>Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleFormChange}
            />
          </div>

          <div className="field">
            <label>Importance (1–5)</label>
            <input
              type="number"
              name="importance"
              min="1"
              max="5"
              value={form.importance}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="field">
            <label>Effort (hours)</label>
            <input
              type="number"
              name="effort"
              min="0"
              value={form.effort}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="field">
            <label>Due date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="field field-submit">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </section>

      {/* Toolbar */}
      <section className="task-toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Sort by:</span>
          <button
            className="btn btn-ghost"
            onClick={() => setSort("priority_score", "desc")}
          >
            Priority
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setSort("due_date", "asc")}
          >
            Due date
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setSort("importance", "desc")}
          >
            Importance
          </button>
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">Filter:</span>
          <button
            className={
              "btn btn-chip" + (query.status === "" ? " btn-chip-active" : "")
            }
            onClick={() => setStatusFilter("")}
          >
            All
          </button>
          <button
            className={
              "btn btn-chip" + (query.status === "pending" ? " btn-chip-active" : "")
            }
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </button>
          <button
            className={
              "btn btn-chip" + (query.status === "completed" ? " btn-chip-active" : "")
            }
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">Page:</span>
          <button className="btn btn-ghost" onClick={() => changePage(-1)}>
            ◀
          </button>
          <span className="page-indicator">{query.page}</span>
          <button className="btn btn-ghost" onClick={() => changePage(1)}>
            ▶
          </button>
        </div>
      </section>

      {/* Tasks Table */}
      <section className="task-table-card">
        <h2 className="section-title">Task List</h2>
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add your first task above.</p>
        ) : (
          <div className="tasks-table-wrapper">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Importance</th>
                  <th>Effort</th>
                  <th>Due</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{t.importance}</td>
                    <td>{t.effort}</td>
                    <td>{t.due_date?.slice(0, 10)}</td>
                    <td>{t.priority_score}</td>
                    <td>
                      <span
                        className={
                          "status-badge " +
                          (t.status === "completed"
                            ? "status-completed"
                            : "status-pending")
                        }
                      >
                        {t.status || "pending"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      {t.status !== "completed" && (
                        <button
                          className="btn btn-small btn-outline"
                          onClick={() => handleComplete(t)}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
