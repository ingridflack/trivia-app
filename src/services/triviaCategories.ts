import axios from "../config/api";
import { Category, ApiResponse } from "../types/sharedTypes";

interface CategoryResponse extends ApiResponse {
  categories: Category[];
}

export const getCategories = () =>
  axios.get<CategoryResponse>("/trivia/categories");
