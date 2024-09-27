import axios from "../config/api";
import {
  ApiResponse,
  TriviaHistory,
  CreateTriviaBody,
  PendingTrivia,
} from "../types/sharedTypes";

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
    timeOut: boolean;
    question: TriviaQuestion;
    isCorrect: boolean;
    completed: boolean;
  };
}

interface TriviaHistoryResponse extends ApiResponse {
  triviaHistory: TriviaHistory[];
}

interface PendingTriviaResponse extends ApiResponse {
  pendingTrivia: PendingTrivia[];
}

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

export const getPendingTrivia = () =>
  axios.get<PendingTriviaResponse>("/trivia/pending");
