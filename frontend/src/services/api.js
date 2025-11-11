import axios from "axios";

const API_URL = "http://localhost:5000";

// TASK ENDPOINTS
export const fetchTasks = (params = {}) =>
  axios.get(`${API_URL}/tasks`, { params });

export const createTask = (task) =>
  axios.post(`${API_URL}/tasks`, task);

export const updateTask = (id, task) =>
  axios.put(`${API_URL}/tasks/${id}`, task);

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/tasks/${id}`);

// ANALYTICS ENDPOINT
export const fetchAnalytics = () =>
  axios.get(`${API_URL}/analytics`);
