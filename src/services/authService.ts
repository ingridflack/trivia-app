import axios from "../config/api";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  name: string;
  username: string;
  avatar?: string;
  passwordConfirmation: string;
}
interface ResetPasswordParams {
  password: string;
  passwordConfirmation: string;
}

export const login = (params: LoginParams) => axios.post("/login", params);

export const register = (params: RegisterParams) =>
  axios.post("/register", params);

export const requestResetPasswordLink = (email: string) =>
  axios.post("/forgot-password", { email });

export const resetPassword = (token: string, body: ResetPasswordParams) =>
  axios.post(`/reset/${token}`, body);
