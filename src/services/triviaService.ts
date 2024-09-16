import axios from "../config/api";
import {
  Category,
  ApiResponse,
  TriviaHistory,
  CreateTriviaBody,
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

export interface TriviaQuestion {
  _id: string;
  question: string;
  difficulty: string;
  answers: string[];
}
interface TriviaQuestionResponse extends ApiResponse {
  question: TriviaQuestion;
}

interface AnswerQuestionResponse extends ApiResponse {
  data: {
    isCorrect: boolean;
    triviaStatus: string;
    question: TriviaQuestion;
  };
  timeOut: boolean;
}

interface TriviaHistoryResponse extends ApiResponse {
  triviaHistory: TriviaHistory[];
}

export const getCategories = () =>
  axios.get<CategoryResponse>("/trivia/categories");

export const createTrivia = (body: CreateTriviaBody) =>
  axios.post<TriviaResponse>("/trivia", body);

export const getTriviaQuestion = (triviaId: string) =>
  axios.get<TriviaQuestionResponse>(`/trivia/${triviaId}`);

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

export const acceptTriviaInvite = (triviaId: string) => {
  return axios.post(`/trivia/${triviaId}/invite/accept`);
};
