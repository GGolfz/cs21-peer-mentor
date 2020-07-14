import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3050/",
  withCredentials:true
});
export default instance;
