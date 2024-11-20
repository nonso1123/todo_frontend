import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-app-bq06.onrender.com/api/",
});

export default api;
