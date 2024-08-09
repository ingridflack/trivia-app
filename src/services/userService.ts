import axios from "../config/api";

export const getUser = () => axios.get("/users");
