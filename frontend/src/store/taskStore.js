import axios from "axios";
import { create } from "zustand";
const BASE_URL = "http://localhost:5000/api";

const taskStore = create((set) => ({
  isLoading: false,

  addTask: async (task) => {
    const { title, description } = task;
    try {
      const response = await axios.post(`${BASE_URL}/add-task`, {
        title,
        description,
      });
      if (response.data.success) {
        return response;
      }
    } catch (error) {
      if (error.response.data.error) {
        console.log(error.response);
        return error.response;
      }
      console.log(error.response);
    }
  },

  getTask: async (currentTaskId) => {
    try {
      const response = await axios.get(`${BASE_URL}/task/${currentTaskId}`);
      if (response.data.success) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  },

  getTasks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);

      if (response.data.success) {
        return response;
      }
    } catch (error) {
      if (error.response.data.error) {
        console.log(error.response.data.error);
        return error.response;
      }
      console.log(error.response);
    }
  },

  updateTask: async (task, currentTaskId) => {
    const { title, description } = task;
    try {
      const response = await axios.put(`${BASE_URL}/task/${currentTaskId}`, {
        title,
        description,
      });

      if (response.data.success) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      return error.message;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/task/${taskId}`);
      if (response.data.success) {
        return response;
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
        return error.response.data;
      }
      console.log(error);
    }
  },
}));

export default taskStore;
