import axios from "../config/api";
import { Category, ApiResponse, Trivia } from "../types/sharedTypes";

interface CategoryResponse extends ApiResponse {
  categories: Category[];
}

interface TriviaQueryParams {
  category: number;
  difficulty: string;
  amount: number;
  type?: string;
}

interface TriviaResponse extends ApiResponse {
  triviaId: string;
}

interface TriviaByIdResponse extends ApiResponse {
  trivia: Trivia;
}

export const getCategories = () =>
  axios.get<CategoryResponse>("/trivia/categories");

export const createTrivia = (params: TriviaQueryParams) =>
  axios.post<TriviaResponse>(
    `/trivia?amount=${params.amount}&type=&difficulty=${params.difficulty}&category=${params.category}`
  );

export const getTriviaById = (triviaId: string) =>
  axios.get<TriviaByIdResponse>(`/trivia/${triviaId}`);
