import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th>Title</th>
            <th>Importance</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Priority Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-b">
              <td>{task.title}</td>
              <td>{task.importance}</td>
              <td>{task.effort}</td>
              <td>{task.due_date?.slice(0, 10)}</td>
              <td>{task.priority_score}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
