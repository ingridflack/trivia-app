import axios from "axios";
import { BASE_URL } from "../config/baseUrl";

interface LoginParams {
  email: string;
  password: string;
}

export const login = ({ email, password }: LoginParams) =>
  axios.post(`${BASE_URL}/login`, { email, password });
