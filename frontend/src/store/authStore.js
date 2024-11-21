import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:5000/auth";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signUp: async (name, email, password) => {
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(`Error: ${error.response.data.error}`);
        return error?.response?.data;
      } else {
        console.log(error.message);
        return error?.message;
      }
    }
  },

  login: async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(`Error: ${error.response.data.error}`);
        return error.response.data.error;
      } else {
        return error.message;
      }
    }
  },

  logout: async () => {
    try {
      response = await axios.post(`${BASE_URL}/logout`);
      return response;
    } catch (error) {
      if (error.response?.data?.error) {
        console.log(error?.response?.data?.error);
        return error.response;
      } else {
        console.log(error.response);
        return error.response;
      }
    }
  },

  guardDashboard: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/guard-dashboard`);
      return response.data;
    } catch (error) {
      return error.response.data.error;
    }
  },

  guardLogin: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/guard-login`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  guardSignup: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/guard-signup`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  guardHomepage: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/guard-homepage`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
}));

export default useAuthStore;
