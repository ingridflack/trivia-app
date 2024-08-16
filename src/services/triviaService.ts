import axios from "../config/api";
import {
  Category,
  ApiResponse,
  Trivia,
  TriviaHistory,
} from "../types/sharedTypes";

interface CategoryResponse extends ApiResponse {
  categories: Category[];
}

interface TriviaQueryParams {
  category: string;
  difficulty: string;
  amount: number;
  type: string;
}

interface AnswerQuestionParams {
  answer: string;
  answerTime: number;
  questionId: string;
  triviaId: string;
}

interface TriviaResponse extends ApiResponse {
  triviaId: string;
}

interface TriviaByIdResponse extends ApiResponse {
  trivia: Trivia;
}

interface AnswerQuestionResponse extends ApiResponse {
  data: {
    isCorrect: boolean;
    triviaStatus: string;
  };
  timeOut: boolean;
}

interface TriviaHistoryResponse extends ApiResponse {
  triviaHistory: TriviaHistory[];
}

export const getCategories = () =>
  axios.get<CategoryResponse>("/trivia/categories");

export const createTrivia = (params: TriviaQueryParams) =>
  axios.post<TriviaResponse>(
    `/trivia?amount=${params.amount}&type=${params.type}&difficulty=${params.difficulty}&category=${params.category}`
  );

export const getTriviaById = (triviaId: string) =>
  axios.get<TriviaByIdResponse>(`/trivia/${triviaId}`);

export const answerQuestion = ({
  answer,
  answerTime,
  questionId,
  triviaId,
}: AnswerQuestionParams) =>
  axios.post<AnswerQuestionResponse>(`/trivia/${triviaId}/answer`, {
    questionId,
    answer,
    answerTime,
  });

export const getTriviaHistory = () =>
  axios.get<TriviaHistoryResponse>("/trivia/history");
