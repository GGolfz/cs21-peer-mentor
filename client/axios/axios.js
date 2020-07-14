import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3050/"
});
export default instance;
