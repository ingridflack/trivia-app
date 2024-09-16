import axios from "../config/api";
import { UserSearch } from "../types/sharedTypes";

export const search = (params: Partial<UserSearch>) =>
  axios.get<UserSearch[]>("/users/search", { params });

export const getUser = () => axios.get("/users");
