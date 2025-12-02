// src/api/Api.js
import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

export default Api;
