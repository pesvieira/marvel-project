import axios from "axios";
//require("cors");

const api = axios.create({
  baseURL: process.env.REACT_APP_MARVEL_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
